// @ts-check
'use strict';
const BusinessUser = require('../models/BusinessUser');
const Mailer = require('../services/Mailer');
const verifyTemplate = require('../services/emailTemplates/businessUserVerifyTemplate');
const vtokenEncryption = require('../services/vtokenEncryption');
const requireAuth = require('../middlewares/requireAuth');
const hashPassword = require('../utils').hashPassword;
const createToken = require('../utils').createToken;

module.exports = app => {
  // app.get(
  //   "/auth/google",
  //   passport.authenticate('google', {
  //     scope: ['profile', 'email']
  //   })
  // );

  // app.get(
  //   "/auth/google/callback",
  //   passport.authenticate('google'),
  //   (req, res) => {
  //     res.direct('/user')
  //   }
  // );

  app.get("/auth/logout", (req, res) => {
    res.redirect('/logout')
  });

  app.post("/auth/business/signin", requireAuth.LocalLogin , (req, res) => {
    res.send({
      token: createToken(req.user)
    });
  });

  app.post('/auth/business/signup', async (req, res) => {
    const username = req.body.username || null;
    const password = req.body.password || null;

    if (!username || !password) {
      return res.status(400).send({
        error: 'username or password is empty'
      });
    }

    const user = await BusinessUser.findOne({
      where: {
        username: username
      }
    });
    if (user) {
      return res.status(403).send({
        error: 'username already exists'
      });
    }
    
    const hash = await hashPassword(password);

    const newUser = await BusinessUser.build({
      username,
      password: hash,
      emailVerified:false
    }).save();
      return res.status(201).send({token:createToken(newUser)});
  });

  app.get('/auth/business/verification', async (req,res)=>{
    const token = JSON.parse(vtokenEncryption.decrypt(req.query.token));
    if( Date.now() >= token.expiredAt) res.status(400).send({error: 'expired token'});
    try{
      let user = await BusinessUser.findById(token.userId, {attributes:['user_business_id','email', 'email_verified']});
      if(user.email !== token.email)  res.status(400).send({error: 'user data not correct'});
      // console.log(user);
      await BusinessUser.update({emailVerified: true}, {where:{userId:token.userId}});
      res.status(204).send('verified');
      
    }catch(err){
      // console.log(err);
      res.status(400).send(err);
    }
  });

  app.post('/auth/business/verification',
            requireAuth.JWToken,  
            async (req, res)=>{
              // console.log('User:',req.user);
              let token = {
                  email: req.user.dataValues.email,
                  expiredAt: Date.now() + 3*24*60*60*1000,
                  userId: req.user.dataValues.userId
              }
              let user = {
                 name: req.user.dataValues.name,
                 verifyToken: vtokenEncryption.encrypt(JSON.stringify(token)),
                 subject: 'Verify your account! Taiwanlent',
                 email: req.user.dataValues.email
              };
              const mailer = new Mailer(user, verifyTemplate(user));
              // console.log(user);
              try{
                const response = await mailer.send();
                res.status(201).send(response);                
              }catch(err){
                // console.log('error to send email verifier');
                res.status(401).send(err);
              }
  })
}

