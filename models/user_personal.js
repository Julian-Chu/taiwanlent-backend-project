/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_personal', {
    user_personal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    living_year_in_germany: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false
    },
    work_experience_1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    work_experience_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    work_experience_3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    german: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    english: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    chinese: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    driving_licence: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    relocation: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    self_introduction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    german_certificate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    english_certificate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chinese_certificate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gender',
        key: 'gender_id'
      }
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'region',
        key: 'region_id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'subject_id'
      }
    },
    photolink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    change_at: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    resume_open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'user_personal'
  });
};
