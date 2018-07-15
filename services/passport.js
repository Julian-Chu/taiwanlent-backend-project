// @ts-check
'use strict'
const passport = require('passport');
const keys = require('../config/key');
const models = require('../models/index');
const BusinessUser = models.UserBusiness;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const dic = require('../dic');
const bcrypt = require('bcrypt');
const utils = require('../utils');

const businessUserLocalLogin = new LocalStrategy({
  session: false
}, async (username, password, done) => {
  try {
    const user = await BusinessUser.findOne({
      where: {
        username: username
      },
      attributes: ['userId', 'username', 'password', 'emailVerified']
    });
    if (!user) return done(null, false);
    const hashFromDB = user.password;
    const isPasswordMatch = await utils.comparePassword(password, hashFromDB);
    if (!isPasswordMatch) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const jwtOptions = {
  // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer <token>
  secretOrKey: keys.jwtSecretKey,
  jsonWebTokenOptions: {
    maxAge: "7d"
  }
};

const businessUserJwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await BusinessUser.findById(payload.sub);
    if (!user) done(null, false);
    else done(null, user);

  } catch (err) {
    console.log('err', err);
  }
})


passport.use(dic.businessLocalLogin, businessUserLocalLogin);
passport.use(dic.businessJwtLogin, businessUserJwtLogin);