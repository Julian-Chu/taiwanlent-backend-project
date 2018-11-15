// @ts-check
'use strict'
const requireAuth = require("../middlewares/requireAuth");
const models = require('../models/index');
const Sequelize = require('sequelize');
const SES = require("../services/awsSES")
const keys = require('../config/key');
const emailTemplate = require("../services/emailTemplates/MessageToTalentsTemplate");

module.exports = app => {

  // 當沒有token或token.verified != true,  回傳人才部分資訊(todo)
  // 針對已驗證的登入使用者回傳全部人才資訊
  app.get("/api/talents", requireAuth.JWToken, async (req, res) => {
    try {
      let excludedFields = ['google_id', 'facebook_id'];

      let talents = await models.PersonalUser.findAll({
        where: {
          resume_open: true
        },
        include: [{
            model: models.Gender,
          },
          {
            model: models.Region
          }, {
            model: models.Subject
          }
        ],

        attributes: {
          exclude: excludedFields,
          include: [
            [Sequelize.literal('gender.gender'), 'gender'],
            [Sequelize.literal('region.region_value'), 'region'],
            [Sequelize.literal('subject.subject_value'), 'subject']
          ]
        }
      })
      console.log(talents);
      return res.status(200).send(talents);
    } catch (err) {
      console.log('err:', err);
    }
  });

  // 針對選定的人才寄送email
  /*req.body:
    {
      "subject": "Test email",
	    "businessUser": {
		    "email":"sender@test.com",
		    "name":"testUser",
      },
      "message": "....."
      
      "candidates":[
        "receiver1@test.com",
        "receiver2@test.com"
        ]
    }
    */
  app.post("/api/talents/message", (req, res) => {
    console.log(req.body);
    const businessUser = req.body.businessUser;
    const candidateEmails = req.body.candidates.map(c => c.email);

    const subject = req.body.subject;
    const message = req.body.message;
    // Create sendEmail params 
    var params = {
      Destination: { /* required */
        CcAddresses: [
          keys.testEmail
          /* more items */
        ],
        ToAddresses: [
          ...candidateEmails
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
            Charset: "UTF-8",
            Data: emailTemplate({
              Name: businessUser.name,
              email: businessUser.email,
              message,
              subject
            })
          },
          Text: {
            Charset: "UTF-8",
            Data: "TEXT_FORMAT_BODY"
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: keys.testEmail,
      /* required */
      ReplyToAddresses: [
        keys.testEmail,
        /* more items */
      ],
    };
    // return res.send("Hello World");
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

}