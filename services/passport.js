// @ts-check
'use strict'
const passport = require('passport');
const keys = require('../config/key');
const models = require('../models/index');
const BusinessUser = models.BusinessUser;
const PersonalUser = models.UserPersonal;
// const GeneralUser = models.UserGeneral;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
// @ts-ignore
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleStrategy = require('passport-google-oauth20');
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
  // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer <token>
  secretOrKey: keys.jwtSecretKey,
  jsonWebTokenOptions: {
    maxAge: "7d"
  }
};

const businessUserJwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log(payload); //{ sub: 2, iat: 1533073785705, verified: false, role: 'business_user' }

    //check role is business_user
    if (payload.role !== dic.roleBusiness) done(null, false);

    let excludedFields = ['user_business_id', 'google_id', 'facebook_id'];
    const user = await BusinessUser.findById(payload.sub, {
      include: [{
        model: models.Gender,
      }],
      attributes: {
        exclude: excludedFields
      }
    });

    excludedFields.forEach(field => {
      delete user[field];
    })

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
    console.log("in google stragety");
    try {

      const existingUser = await BusinessUser.findOne({
        where: {
          google_id: profile.id
        },
        // attributes: ['user_id', 'google_id', 'user_business_id', 'user_personal_id']
        attributes: ['user_business_id', 'google_id']
      })
      if (existingUser) {
        done(null, existingUser);
      } else {
        console.log('user not exist, create new user');
        const businessUser = await BusinessUser.create({
          google_id: profile.id
        });
        console.log('businessUser:', businessUser);
        done(null, businessUser);
      }
    } catch (err) {
      console.log(Date.now());
      console.log(err);
      // redirect to error page?
    }
  }
)

const generialUserJwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log(payload); //{ sub: 2, iat: 1533073785705, verified: false, role: 'business_user' }

    //check role is business_user
    if (payload.role !== dic.roleBusiness || payload.role !== dic.rolePersonal) done(null, false);
    let user;
    if (payload.role === dic.roleBusiness) {

      let excludedFields = ['user_business_id', 'google_id', 'facebook_id'];
      user = await BusinessUser.findById(payload.sub, {
        attributes: {
          exclude: excludedFields
        }
      });
      excludedFields.forEach(field => {
        delete user[field];
      })
    } else if (payload.role === dic.rolePersonal) {
      let excludedFields = ['user_personal_id', 'google_id', 'facebook_id'];
      user = await PersonalUser.findById(payload.sub, {
        attributes: {
          exclude: excludedFields
        }
      });
      excludedFields.forEach(field => {
        delete user[field];
      })
    }

    if (!user) done(null, false);
    else done(null, user);

  } catch (err) {
    console.log('err', err);
  }
})
passport.use(dic.businessLocalLogin, businessUserLocalLogin);
passport.use(dic.businessJwtLogin, businessUserJwtLogin);
passport.use(dic.businessUserGoogleLogin, businessUserGoogleLogin);
passport.use(dic.generialJwtLogin, generialUserJwtLogin);