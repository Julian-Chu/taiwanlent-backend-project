/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  let PersonalUser = sequelize.define('user_personal', {
    user_personal_id: {
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
    facebook_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(25),
      // allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(320),
      // allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    phone: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    occupation: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    living_year_in_germany: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull: true,
      defaultValue: 0
    },
    school: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    work_experience_1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    work_experience_2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    work_experience_3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    german: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
    english: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
    chinese: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
    driving_licence: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
    relocation: {
      type: DataTypes.BOOLEAN,
      // allowNull: false
    },
    self_introduction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    german_certificate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    english_certificate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    chinese_certificate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gender_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'gender',
        key: 'gender_id'
      }
    },
    region_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'region',
        key: 'region_id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'subject',
        key: 'subject_id'
      }
    },
    photolink: {
      type: DataTypes.STRING(2083),
      allowNull: true
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
    resume_open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'user_personal',
    schema: "taiwanlent"
  });
  PersonalUser.associate = function (models) {
    models.PersonalUser.belongsTo(models.Gender, {
      foreignKey: 'gender_id'
    })
  }

  return PersonalUser;
};