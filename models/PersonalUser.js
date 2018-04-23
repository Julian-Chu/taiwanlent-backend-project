const sequelize = require('../services/sequelize').sequelize;
const Sequelize = require('sequelize');
const Gender = require('./Gender');

const PersonalUser = sequelize.define('user_personal',{
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_personal_id'
  },
  password:{
    type: Sequelize.STRING(50),
  },
  username:{
    type: Sequelize.STRING(50)
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
  gender_id: {
    type: Sequelize.INTEGER,
  }
},{
  freezeTableName: true,
  timestamps: false
} );

PersonalUser.belongsTo(Gender, {foreignKey: 'gender_id'});

PersonalUser.findAll({
  include: [{
    model: Gender,
    required: true
  }]
}).then(users=>{
  console.log(users);
  users.map(user=>console.log(user));
})