/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('region', {
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    region_value: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    region_label: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'region',
    timestamps: false
  });
};