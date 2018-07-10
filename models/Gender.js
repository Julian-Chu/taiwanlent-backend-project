/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('gender', {
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'gender',
    timestamps: false
  });
};