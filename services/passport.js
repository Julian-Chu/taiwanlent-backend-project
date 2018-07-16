// @ts-check
'use strict'
const passport = require('passport');
const keys = require('../config/key');
const models = require('../models/index');
const BusinessUser = models.UserBusiness;
const GeneralUser = models.UserGeneral;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
// @ts-ignore
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

const businessUserGoogleLogin = new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshtoken, profile, done) => {
    const existingUser = await GeneralUser.findOne({
      where: {
        google_id: profile.id
      },
      attributes: ['user_id', 'google_id', 'user_business_id', 'user_personal_id']
    })

    if (existingUser) {
      done(null, existingUser);
    } else {
      // BusinessUser.create({})
      // GeneralUser.create({
      //   google_id: profile.id
      // }).then(user => {
      //   console.log(user.get({
      //     plain: true
      //   }));
      // })
    }
  }
)
passport.use(dic.businessLocalLogin, businessUserLocalLogin);
passport.use(dic.businessJwtLogin, businessUserJwtLogin);
passport.use(dic.businessGoogleLogin, businessUserGoogleLogin);