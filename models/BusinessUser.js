/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_business', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_business_id'
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      primaryKey: true,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    company_location: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    industry: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    product_introduction: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gender',
        key: 'gender_id'
      },
      defaultValue: 1
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'create_at',
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'change_at',
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'email_verified',
      defaultValue: false
    }
  }, {
    tableName: 'user_business',
    schema: "taiwanlent"
  });
};