const sequelize = require('../services/sequelize').sequelize;
const Sequelize = require('sequelize');

const Gender = sequelize.define('gender',{
  genderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'gender_id'
  },
  gender:{
    type: Sequelize.STRING(10),
    field:'gender'
  }
},{
  freezeTableName: true,
  timestamps: false
} );

// Gender.findAll().then(genders=>{
//   console.log(genders);
// })

module.exports = Gender;
