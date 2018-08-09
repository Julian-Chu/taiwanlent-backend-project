/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let BusinessUser = sequelize.define('user_business', {
    user_business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      // field: 'user_business_id'
    },
    google_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    facebook_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
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
    companyName: {
      type: DataTypes.STRING(50),
      field: 'company_name',
      allowNull: true,
      defaultValue: ''
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    companyLocation: {
      type: DataTypes.STRING(50),
      field: 'company_location',
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
    productIntroduction: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: 'product_introduction',
      defaultValue: ''
    },
    // gender_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   // references: {
    //   //   model: 'gender',
    //   //   key: 'gender_id'
    //   // },
    //   defaultValue: 1
    // },
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

  BusinessUser.associate = function (models) {
    models.BusinessUser.belongsTo(models.Gender, {
      foreignKey: 'gender_id'
    })
  }


  return BusinessUser;
};