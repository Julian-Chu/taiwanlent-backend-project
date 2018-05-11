// @ts-check
'use strict';
const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/key');
const dic = require('../dic');

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

  app.post("/auth/business/signin", passport.authenticate(dic.businessLocalLogin, {session:false})  , (req, res) => {
    res.send({
      token: createTokenForUser(req.user)
    });
  })
}

function createTokenForUser(user) {
  console.log('jwt key:', keys.jwtSecretKey);
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.userId,
    iat: timestamp
  }, keys.jwtSecretKey)
}


const signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).send({})
  }
  // todo
}