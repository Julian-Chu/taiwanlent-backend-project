// @ts-check
'use strict'
const requireAuth = require('../middlewares/requireAuth');
module.exports = app=>{
  //取得用戶資料
  app.get('/api/businessuser', requireAuth.JWToken, (req,res)=>{
    return res.send({user: req.user});
  });

  //用戶註冊資料  
  app.post('/api/businessuser', requireAuth.JWToken, (req,res)=>{
    return res.status(201).send({});
  })

  //用戶修改資料
  app.patch('/api/businessuer', requireAuth.JWToken, (req, res)=>{
    return res.status(200).send({})
  })
}