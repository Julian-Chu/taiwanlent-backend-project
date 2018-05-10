const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const BusinessUser = require('../models/BusinessUser');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const businessUserLocalLogin = new LocalStrategy(async (username, password, done) => {
  console.log('in passport:');
  console.log('username:', username);
  console.log('password:', password);
  try {
    const user = await BusinessUser.findOne({
      where: {
        username: 'test_businessUser'
      },
      attributes: ['userId', 'username', 'password']
    });
    if (!user || password !== user.dataValues.password) {
      return done(null, false);
    }
    return done(null, user);    
  } catch (err) {
    return done(err);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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

passport.use('businessLocalLogin', businessUserLocalLogin);
passport.use('businessJwtLogin', businessUserJwtLogin);