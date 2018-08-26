// @ts-check
'use strict'
const passport = require('passport');
const keys = require('../config/key');
const models = require('../models/index');
const BusinessUser = models.BusinessUser;
const PersonalUser = models.PersonalUser;
const Sequelize = require('sequelize');
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
      attributes: ['user_business_id', 'username', 'password', 'emailVerified']
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
  ignoreExpiration: false,
  jsonWebTokenOptions: {
    maxAge: "10"
  },

};

const businessUserJwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log('businessUserJwt:', payload); //{ sub: 2, iat: 1533073785705, verified: false, role: 'business_user',exp:'1534106991601' }

    // let expireTime = new Date(payload.exp).getSeconds();
    console.log('exp:', payload.exp);
    // console.log('expTime:', expireTime);
    console.log(Date.now());
    if (payload.exp <= Date.now()) {
      console.log('token expired');
      return done(null, false);
    }
    //check role is business_user
    if (payload.role !== dic.roleBusiness) return done(null, false);

    let excludedFields = ['google_id', 'facebook_id', 'gender_id'];
    const user = await BusinessUser.findById(payload.sub, {
      include: [{
        model: models.Gender,
      }],
      attributes: {
        exclude: excludedFields,
        include: [
          [Sequelize.literal('gender.gender'), 'gender']
        ]
      }
    });

    excludedFields.forEach(field => {
      delete user[field];
    })

    if (!user) return done(null, false);
    else return done(null, user);

  } catch (err) {
    console.log('err', err);
  }
})

const businessUserGoogleLogin = new GoogleStrategy({
    clientID: keys.googleClientID_business,
    clientSecret: keys.googleClientSecret_business,
    callbackURL: '/auth/google/business/callback',
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
        return done(null, existingUser);
      } else {
        console.log('user not exist, create new user');
        const businessUser = await BusinessUser.create({
          google_id: profile.id
        });
        console.log('businessUser:', businessUser);
        return done(null, businessUser);
      }
    } catch (err) {
      console.log(Date.now());
      console.log(err);
      // redirect to error page?
    }
  }
)


const personalUserGoogleLogin = new GoogleStrategy({
    clientID: keys.googleClientID_personal,
    clientSecret: keys.googleClientSecret_personal,
    callbackURL: '/auth/google/personal/callback',
    proxy: true
  },
  async (accessToken, refreshtoken, profile, done) => {
    console.log("in google stragety");
    try {

      const existingUser = await PersonalUser.findOne({
        where: {
          google_id: profile.id
        },
        attributes: ['user_personal_id', 'google_id']
      })
      if (existingUser) {
        return done(null, existingUser);
      } else {
        console.log('user not exist, create new user');
        const personalUser = await PersonalUser.create({
          google_id: profile.id
        });
        console.log('peronsalUser:', personalUser);
        return done(null, personalUser);
      }
    } catch (err) {
      console.log(Date.now());
      console.log(err);
    }
  }
)

const generialUserJwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log('Jwt log in', payload); //{ sub: 2, iat: 1533073785705, verified: false, role: 'business_user' }

    //check role is business_user
    if (payload.role !== dic.roleBusiness && payload.role !== dic.rolePersonal) return done(null, false);
    let user;
    if (payload.role === dic.roleBusiness) {
      console.log('business user');
      let excludedFields = ['google_id', 'facebook_id'];
      user = await BusinessUser.findById(payload.sub, {
        include: [{
          model: models.Gender,
        }],
        attributes: {
          exclude: excludedFields,
          include: [
            [Sequelize.literal('gender.gender'), 'gender']
          ]
        }
      });

      excludedFields.forEach(field => {
        delete user[field];
      })
    } else if (payload.role === dic.rolePersonal) {
      let excludedFields = ['google_id', 'facebook_id'];
      user = await PersonalUser.findById(payload.sub, {
        include: [{
            model: models.Gender,
          },
          {
            model: models.Region
          },
          {
            model: models.Subject
          }

        ],
        attributes: {
          exclude: excludedFields,
          include: [
            [Sequelize.literal('gender.gender'), 'gender'],
            [Sequelize.literal('region.region_value'), 'region'],
            [Sequelize.literal('subject.subject_value'), 'subject']
          ]
        }
      });
    }

    if (!user) return done(null, false);
    else return done(null, user);

  } catch (err) {
    console.log('err', err);
  }
})
passport.use(dic.businessLocalLogin, businessUserLocalLogin);
passport.use(dic.businessJwtLogin, businessUserJwtLogin);
passport.use(dic.businessUserGoogleLogin, businessUserGoogleLogin);
passport.use(dic.generialJwtLogin, generialUserJwtLogin);
passport.use(dic.peronsalUserGoogleLogin, personalUserGoogleLogin);