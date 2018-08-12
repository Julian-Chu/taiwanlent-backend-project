const passport = require('passport');
const dic = require('../dic');


const LocalLogin = passport.authenticate(dic.businessLocalLogin, {
  session: false
})
const JWToken = passport.authenticate(dic.businessJwtLogin, {
  session: false
})

const GoogleLoginBusiness = passport.authenticate(dic.businessUserGoogleLogin, {
  scope: ['profile', 'email'],
  // failureRedirect: '/',
  session: false
})

module.exports = {
  LocalLogin,
  JWToken,
  GoogleLoginBusiness
}