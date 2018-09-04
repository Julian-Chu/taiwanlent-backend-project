// @ts-check
'use strict'
const requireAuth = require("../middlewares/requireAuth");
const models = require('../models/index');
const Sequelize = require('sequelize');

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
  app.post('/api/candidates/message', () => {

  })
}