const businessLocalLogin = 'businessLocalLogin';
const businessJwtLogin = 'businessJwtLogin';
const businessUserGoogleLogin = 'business_google';
const generialJwtLogin = 'generialJwtLogin';
const roleBusiness = "business_user";
const rolePersonal = "personal_user";
const peronsalUserGoogleLogin = "personal_google";
const FrontendServer = process.env.FrontendServer || "http://localhost:3000";


module.exports = {
  businessJwtLogin,
  businessLocalLogin,
  businessUserGoogleLogin,
  generialJwtLogin,
  roleBusiness,
  rolePersonal,
  peronsalUserGoogleLogin,
  FrontendServer
}