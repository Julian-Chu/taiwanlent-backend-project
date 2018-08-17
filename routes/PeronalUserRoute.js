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
  app.post("/api/personaluser", (req, res) => {
    console.log(req.body);
    const user = PersonalUser.build({
      username: req.username,
      email: req.email,
      name: req.name,
      phone: req.phone,
      city: req.city,
      occupation: req.occupation,
      livingYearInGermany: req.livingYearInGermany,
      school: req.school,
      workExperience_1: req.workExperience_1,
      workExperience_2: req.workExperience_2,
      workExperience_3: req.workExperience_3,
      german: req.german,
      english: req.english,
      chinese: req.chinese,
      drivingLicence: req.drivingLicence,
      relocation: req.relocation,
      selfIntroduction: req.selfIntroduction,
      germanCertificate: req.germanCertificate,
      englishCertificate: req.english,
      chineseCertificate: req.chinese,
      gender_id: req.gender_id,
      region_id: req.region_id,
      subject_id: req.subject_id,
      photolink: req.photolink,
      resumeIsOpened: req.resumeIsOpened
    });
    // console.log(user);
    // user.save().then(()=>{
    //   res.status(204);
    // })
  });

  //用戶修改資料
  app.patch("/api/personaluser", (req, res) => {

  });


}