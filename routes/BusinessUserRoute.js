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
    // console.log('req.body:', req.body);
    // console.log('req.user:', req.user);
    let user = req.body;
    models.BusinessUser.upsert({
      user_business_id: req.user.user_business_id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      companyName: user.companyName,
      companyLocation: user.companyLocation,
      address: user.address,
      industry: user.industry,
      productIntroduction: user.productIntroduction,
      gender: {
        gender: user.gender
      }

    }, {
      // // where: {
      // //   user_business_id: req.user.user_business_id
      // // },
      // include:[models.Gender]
    }).then((businessuser) => {
      console.log('user:', businessuser);
      return res.status(204).send({});
    }).catch(err => console.log(err));


  })

  //用戶修改資料
  app.patch('/api/businessuer', requireAuth.JWToken, (req, res) => {
    return res.status(200).send({})
  })
}