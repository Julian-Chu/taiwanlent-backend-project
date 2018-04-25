
const sequelize = require('../services/sequelize').sequelize;
const Sequelize = require('sequelize');

const Subject = sequelize.define('subject',{
  subjectId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'subject_id'
  },
  value: {
    type: Sequelize.STRING(10),
    field:'subject_value'
  },
  label: {
    type: Sequelize.STRING(50),
    field: 'subject_label'
  }
},{
  freezeTableName: true,
  timestamps: false
} );

Subject.findAll().then(subjects =>{
  console.log(subjects);
})

module.exports = Subject;
