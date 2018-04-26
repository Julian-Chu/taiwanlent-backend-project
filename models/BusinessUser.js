const sequelize = require('../services/sequelize').sequelize;
const Sequelize = require('sequelize');
const Gender = require('./Gender');

const  BusinessUser = sequelize.define('user_business',{
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_business_id'
  },
  username:{
    type: Sequelize.STRING(25)
  },
  password:{
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
  companyName: {
    type: Sequelize.STRING(50),
    field:'company_name'
  },
  department: {
    type: Sequelize.STRING(50)
  },
  companyLocation: {
    type: Sequelize.STRING(50),
    field: 'company_location'
  },
  address:{
    type: Sequelize.STRING(50)
  },
  industry: {
    type: Sequelize.STRING(50)
  },
  productIntroduction: {
    type: Sequelize.STRING(250),
    field: 'product_introduction'
  },
  genderId: {
    type: Sequelize.INTEGER,
    field: 'gender_id'
  },
},{
  freezeTableName: true,
  timestamps: false
} );

BusinessUser.belongsTo(Gender,{foreignKey: 'gender_id'});

BusinessUser.findAll({include:[{model:Gender}]})
          .then(users=> users.map(user=>console.log(user)));