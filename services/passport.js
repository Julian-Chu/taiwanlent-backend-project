// @ts-check
'use strict'
const passport = require('passport');
const keys = require('../config/key');
const BusinessUser = require('../models/BusinessUser');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const dic = require('../dic');
const bcrypt = require('bcrypt');

const businessUserLocalLogin = new LocalStrategy({session:false}, async (username, password, done) => {
  try {
    const user = await BusinessUser.findOne({
      where: {
        username: 'test_businessUser'
      },
      attributes: ['userId', 'username', 'password']
    });

    const hashedPassword = await hashPassword(password);
    const hashFromDB = user.dataValues.password;
    if (!user || !comparePassword(hashedPassword, hashFromDB)) {
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
  jsonWebTokenOptions :{
    maxAge: "7d"
  }
};

const businessUserJwtLogin = new JwtStrategy(jwtOptions, async (payload, done)=>{
  try{
    const user = await BusinessUser.findById(payload.sub);
    if(!user) done(null , false);
    else done(null, user);

  }catch(err){
    console.log('err', err);
  }
})

async function comparePassword(hashedPassword, hashFromDB){
  const isEqual = await new Promise((resolve, reject)=>{
    bcrypt.compare(hashedPassword, hashFromDB,(err,res)=>{
      if(err) reject(err);
      resolve(res);
    });
  })
  return isEqual;
};

async function hashPassword(plainTextPassword){
  const saltRounds = 10;

  const hashPassword = await new Promise((resolve, reject)=>{
    bcrypt.hash(plainTextPassword, saltRounds, (err, res)=>{
      if(err) reject(err);
      resolve(res);
    });
  })

  return hashPassword;
};
passport.use(dic.businessLocalLogin, businessUserLocalLogin);
passport.use(dic.businessJwtLogin, businessUserJwtLogin);