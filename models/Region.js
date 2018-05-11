
const sequelize = require('../services/sequelize').sequelize;
const Sequelize = require('sequelize');

const Region = sequelize.define('region',{
  regionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'region_id'
  },
  value:{
    type: Sequelize.STRING(10),
    field:'region_value'
  },
  label:{
    type: Sequelize.STRING(50),
    field: 'region_label'
  }
},{
  schema: 'taiwanlent',
  freezeTableName: true,
  timestamps: false
} );

// Region.findAll().then(regions=>{
//   console.log(regions);
// })

module.exports = Region;
