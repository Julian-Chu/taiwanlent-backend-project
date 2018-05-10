const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const BusinessUser = require('../models/BusinessUser');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const dic = require('../dic');

const businessUserLocalLogin = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await BusinessUser.findOne({
      where: {
        username: 'test_businessUser'
      },
      attributes: ['userId', 'username', 'password']
    });
    if (!user || password !== user.dataValues.password) {
      // todo: hash and salt
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
passport.use(dic.businessLocalLogin, businessUserLocalLogin);
passport.use(dic.businessJwtLogin, businessUserJwtLogin);