// @ts-check
'use strict';
const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/key');
const dic = require('../dic');
const BusinessUser = require('../models/BusinessUser');

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

    const newUser = BusinessUser.build({
      username,
      password,
    }).save().then(user=>{
      return res.status(201).send({token:createTokenForUser(user, false)});
    })
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