// @ts-check
'use strict'
const requireAuth = require('../middlewares/requireAuth');
module.exports = app=>{
  app.get('/businessuser', requireAuth.JWToken, (req,res)=>{
    res.send({user: req.user});
  })
}