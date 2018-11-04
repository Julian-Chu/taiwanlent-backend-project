// @ts-check
"use strict";
const requireAuth = require("../middlewares/requireAuth");
const models = require("../models/index");
const SES = require("../services/awsSES")
const keys = require('../config/key');
module.exports = app => {
  //取得用戶資料
  app.get("/api/businessuser", requireAuth.JWToken, (req, res) => {
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
  app.patch("/api/businessuser", requireAuth.JWToken, (req, res) => {
    return res.status(200).send({});
  });

  app.post("/api/businessuser/emails", (req, res) => {
    // Create sendEmail params 
    var params = {
      Destination: { /* required */
        CcAddresses: [
          keys.testEmail
          /* more items */
        ],
        ToAddresses: [
          keys.testEmail
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
            Charset: "UTF-8",
            Data: "HTML_FORMAT_BODY"
          },
          Text: {
            Charset: "UTF-8",
            Data: "TEXT_FORMAT_BODY"
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Test email'
        }
      },
      Source: keys.testEmail,
      /* required */
      ReplyToAddresses: [
        keys.testEmail,
        /* more items */
      ],
    };

    // @ts-ignore
    var sendPromise = SES.sendEmail(params).promise();
    sendPromise.then((data) => {
      console.log(data.MessageId);
      return res.status(204).send(data.MessageId)
    }).catch((err) => {
      console.error(err, err.stack);
      return res.status(400).send(err);
    })
  })

};