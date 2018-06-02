// @ts-check
'use strict';
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
    type: Sequelize.STRING(60)
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
  emailVerified: {
    type: Sequelize.BOOLEAN,
    field:'email_verified'
  }
},{
  schema: 'taiwanlent',
  freezeTableName: true,
  timestamps: false
} );

BusinessUser.belongsTo(Gender,{foreignKey: 'gender_id'});


module.exports =  BusinessUser;

// code for test
// BusinessUser.findAll({include:[{model:Gender}]})
//           .then(users=> users.map(user=>console.log(user)));


  // BusinessUser.findOne({
  //   where: {
  //     username: 'test_businessUr'
  //   },
  //   attributes:['userId', 'username', 'password']
  // }).then(user => {
  //     console.log(user);
  //     console.log(user.dataValues);
  //     console.log('1234'=== user.dataValues.password);
  // }).catch(err=>{
  //   console.log('err',err);
  // })

//   async function getUser(){
//   const user = await BusinessUser.findOne({
//     where: {
//       username: 'test_businessUr'
//     },
//     attributes:['userId', 'username', 'password']
//   });
//   if(!user) console.log('user is null or undefined:', user);
//   if(user) console.log('user:', user);
// }

// getUser();
// BusinessUser.findById(2).catch(err=>console.log('err:', err)).then(user=>console.log(user));