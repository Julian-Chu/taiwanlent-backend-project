const sequelize = require('../services/sequelize').sequelize;
const Sequelize = require('sequelize');
const Gender = require('./Gender');
const Region = require('./Region');
const Subject = require('./Subject');

const PersonalUser = sequelize.define('user_personal',{
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_personal_id'
  },
  password:{
    type: Sequelize.STRING(25),
  },
  username:{
    type: Sequelize.STRING(25)
  },
  email: {
    type: Sequelize.STRING(320)
  },
  name:{
    type: Sequelize.STRING(50)
  },
  phone:{
    type: Sequelize.STRING(50)
  },
  city: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  occupation: {
    type: Sequelize.STRING(50)
  },
  livingYearInGermany:{
    type: Sequelize.INTEGER,
    field: 'living_year_in_germany'
  },
  school: {
    type: Sequelize.STRING(50)
  },
  workExperience_1: {
    type: Sequelize.STRING(50),
    field: 'work_experience_1'

  },
  workExperience_2: {
    type: Sequelize.STRING(50),
    field: 'work_experience_2'
  },
  workExperience_3: {
    type: Sequelize.STRING(50),
    field: 'work_experience_3'
  },
  german: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  english: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  chinese: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  drivingLicence: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    field: 'driving_licence'
  },
  
  relocation: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  selfIntroduction: {
    type: Sequelize.STRING(250),
    defaultValue: false,
    field: 'self_introduction'
  },
  germanCertificate: {
    type: Sequelize.STRING(50),
    defaultValue: false,
    field: 'german_certificate'
  },
  englishCertificate:{
    type: Sequelize.STRING(50),
    defaultValue: false,
    field: 'english_certificate'
  },
  chineseCertificate:{
    type: Sequelize.STRING(50),
    defaultValue: false,
    field: 'chinese_certificate'
  },

  gender_id: {
    type: Sequelize.INTEGER,
  },
  region_id:{
    type: Sequelize.INTEGER,
  },
  subject_id: {
    type: Sequelize.INTEGER
  },
  photolink:{
    type: Sequelize.STRING(2083),
    defaultValue: false,
  },
  resumeIsOpened: {
    type: Sequelize.BOOLEAN,
    field: 'resume_open'
  }
},{
  freezeTableName: true,
  timestamps: false
} );

PersonalUser.belongsTo(Gender, {foreignKey: 'gender_id'});
PersonalUser.belongsTo(Region, {foreignKey: 'region_id'});
PersonalUser.belongsTo(Subject, {foreignKey: 'subject_id'});

module.exports = PersonalUser;

// code for test
// PersonalUser.findAll({
//   include: [
//   { model: Gender,
//     // required: true
//   },
//   { model: Subject},
//   { model: Region }
// ]
// }).then(users=>{
//   // console.log(users);
//   users.map(user=>{
//     console.log(user.gender.dataValues.gender);
//     console.log(user.region.dataValues.label);
//     // console.log(user.subject.dataValues.label)
//     console.log(user);
//   });
// })