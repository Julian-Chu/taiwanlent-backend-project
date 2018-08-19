// @ts-check
'use strict'
const models = require('../models/index');
const PersonalUser = models.UserPersonal;
const requireAuth = require("../middlewares/requireAuth");


module.exports = app => {
  // app.get("/user", (req, res) => {
  //   PersonalUser.findAll({})
  //     .then(users => res.status(200).json(users));
  // });

  // app.get("/user/:id", (req, res) => {
  //   if (req.params.id != 0) {
  //     console.log(req.params.id);
  //     PersonalUser.findOne({
  //         where:{
  //           userId: req.params.id
  //         },
  //         attributes: { exclude: ['password'] }
  //       })
  //       .then(user => res.status(200).json(user));
  //   } else {
  //     res.status(400);
  //   }
  // });

  app.get("/api/personaluser", requireAuth.JWToken, (req, res) => {
    return res.status(200).send(req.user);
  })
  // 註冊用戶資料
  app.post("/api/personaluser", requireAuth.JWToken, async (req, res) => {
    console.log('req.body:', req.body);
    let userdata = req.body;

    try {
      let subject_id;
      if (userdata.subject) {
        subject_id = await models.Subject.findOne({
          where: {
            subject_value: userdata.subject
          },
          attributes: ['subject_id']
        }).then(res => {
          console.log('sub res:', res);
          return res.dataValues.subject_id;
        });
      }
      let region_id;
      if (userdata.region) {
        region_id = await models.Region.findOne({
          where: {
            region_value: userdata.region
          },
          attributes: ['region_id']
        }).then(res => {
          console.log('region res:', res);
          return res.dataValues.region_id
        })
      }

      console.log('sub_id:', subject_id);
      console.log(region_id);


      // console.log('sub_id:', subject_id);
      const result = await models.PersonalUser.update({
        username: userdata.username,
        email: userdata.email,
        name: userdata.name,
        phone: userdata.phone,
        city: userdata.city,
        occupation: userdata.occupation,
        livingYearInGermany: userdata.livingYearInGermany,
        school: userdata.school,
        workExperience_1: userdata.workExperience_1,
        workExperience_2: userdata.workExperience_2,
        workExperience_3: userdata.workExperience_3,
        german: userdata.german,
        english: userdata.english,
        chinese: userdata.chinese,
        licence: userdata.licence,
        relocation: userdata.relocation,
        selfIntroduction: userdata.selfIntroduction,
        german_certificate: userdata.german_certificate,
        english_certificate: userdata.english_certificate,
        chinese_certificate: userdata.chinese_certificate,
        gender_id: userdata.gender === "male" ? 1 : 2,
        region_id: userdata.region_id,
        subject_id: userdata.subject_id,
        photolink: userdata.photolink,
        resumeIsOpened: userdata.resumeIsOpened
      }, {
        where: {
          user_personal_id: req.user.user_personal_id
        }
      });
      console.log('user:', result);
      return res.status(204).send({});
    } catch (err) {
      console.log(err);
      return res.status(400).send({})
    }
  });
}