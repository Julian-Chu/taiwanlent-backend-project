// @ts-check
'use strict'
const requireAuth = require('../middlewares/requireAuth');
module.exports = app=>{
  app.get('/api/businessuser', requireAuth.JWToken, (req,res)=>{
    return res.send({user: req.user});
  });

  app.post('/api/businessuser', requireAuth.JWToken, (req,res)=>{
    return res.status(204).send({});
  })
}