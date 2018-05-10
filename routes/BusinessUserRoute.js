const passport = require('passport');
const dic = require('../dic');
module.exports = app=>{
  app.get('/businessuser', passport.authenticate(dic.businessJwtLogin, {session:false}), (req,res)=>{
    res.send({user: req.user});
  })
}