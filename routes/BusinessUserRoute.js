// @ts-check
"use strict";
const requireAuth = require("../middlewares/requireAuth");
const models = require("../models/index");
module.exports = app => {
  //取得用戶資料
  app.get("/api/businessuser", requireAuth.JWToken, (req, res) => {
    console.log('req.res:', req);
    console.log('req.user:', req.user);
    if (req.res === 401) {
      // return res.status(401).send();
      return;
    }

    return res.send(req.user);
  });

  //用戶註冊資料
  app.post("/api/businessuser", requireAuth.JWToken, async (req, res) => {
    let user = req.body;
    try {
      let result = await models.BusinessUser.update({
        email: user.email,
        name: user.name,
        phone: user.phone,
        companyName: user.companyName,
        companyLocation: user.companyLocation,
        address: user.address,
        industry: user.industry,
        productIntroduction: user.productIntroduction,
        gender_id: user.gender === "male" ? 1 : 2
      }, {
        where: {
          user_business_id: req.user.user_business_id
        },
      })
      console.log("user:", result);
      return res.status(204).send({});
    } catch (err) {
      console.log(err);
      return res.status(400).send({});
    }
  });

  //用戶修改資料
  app.patch("/api/businessuer", requireAuth.JWToken, (req, res) => {
    return res.status(200).send({});
  });
};