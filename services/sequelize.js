//@ts-check
'use strict'
const Sequelize = require('sequelize');
const sequelize = new Sequelize('Test','postgres','1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = { sequelize:sequelize };

//Or
// onst sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
  .authenticate()
  .then(()=>{
    console.log('Connection has been established successfully');
  })
  .catch(err=>{
    console.error('Unable to connect to the database:',err);
  });