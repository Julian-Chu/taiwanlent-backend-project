/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_general', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    google_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    fackbook_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_business',
        key: 'user_business_id'
      }
    },
    user_personal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_personal',
        key: 'user_personal_id'
      }
    }
  }, {
    tableName: 'user_general'
  });
};
