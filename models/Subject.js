/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('subject', {
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subject_value: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    subject_label: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'subject',
    schema: "taiwanlent",
    timestamps: false
  });
};