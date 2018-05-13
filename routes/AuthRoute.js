// @ts-check
'use strict';
const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/key');
const dic = require('../dic');
const BusinessUser = require('../models/BusinessUser');
const bcrypt = require('bcrypt');
const Mailer = require('../services/Mailer');
const verifyTemplate = require('../services/emailTemplates/businessUserVerifyTemplate');

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate('google'),
    (req, res) => {
      res.direct('/user')
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect('/')
  });

  app.post("/auth/business/signin", passport.authenticate(dic.businessLocalLogin, {
    session: false
  }), (req, res) => {
    res.send({
      token: createTokenForUser(req.user, true)
    });
  })

  app.post('/auth/business/signup', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

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

    const newUser = BusinessUser.build({
      username,
      password: hash,
    }).save().then(user=>{
      return res.status(201).send({token:createTokenForUser(user, false)});
    })
  })

  app.get('/auth/business/verification', async (req,res)=>{
    res.send(req.query.vtoken);
  })

  app.post('/auth/business/verification',
            passport.authenticate(dic.businessJwtLogin, {session:false}),  
            async (req, res)=>{
              // console.log('User:',req.user);
              let user = {
                 name: req.user.dataValues.name,
                 verifyToken: req.user.dataValues.userId,
                 subject: 'Verify your account! Taiwanlent',
                 email: req.user.dataValues.email

              };
              const mailer = new Mailer(user, verifyTemplate(user));
              console.log(user);
              try{
                const response = await mailer.send();
                res.status(201).send(response);                
              }catch(err){
                console.log('error to send email verifier');
                res.status(401).send(err);
              }
  })
}

function createTokenForUser(user, verified) {
  console.log('jwt key:', keys.jwtSecretKey);
  console.log('user:', user);
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.userId,
    iat: timestamp,
    verified
  }, keys.jwtSecretKey)
}

async function hashPassword(plainTextPassword){
  const saltRounds = 10;

  const hashPassword = await new Promise((resolve, reject)=>{
    bcrypt.hash(plainTextPassword, saltRounds, (err, res)=>{
      if(err) reject(err);
      resolve(res);
    });
  })

  return hashPassword;
}