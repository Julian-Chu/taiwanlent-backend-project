// @ts-check
'use strict'
const requireAuth = require('../middlewares/requireAuth');
const models = require('../models/index');
module.exports = app => {
  //取得用戶資料
  app.get('/api/businessuser', requireAuth.JWToken, (req, res) => {
    console.log('get user data');
    return res.send(req.user);
  });

  //用戶註冊資料  
  app.post('/api/businessuser', requireAuth.JWToken, (req, res) => {
    console.log(req.body);
    return res.status(204).send({});
  })

  //用戶修改資料
  app.patch('/api/businessuer', requireAuth.JWToken, (req, res) => {
    return res.status(200).send({})
  })
}