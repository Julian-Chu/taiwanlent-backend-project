import Sequelize from 'sequelize';

const sequelize = new Sequelize('taiwanlent', 'root', 'dv5606', {
  dialect: 'mysql'
});

const models = {
  UserAdmin: sequelize.import('./AdminUser'),
  UserBusiness: sequelize.import('./BusinessUser'),
  UserGeneral: sequelize.import('./GeneralUser'),
  UserPersonal: sequelize.import('./PersonalUser'),
  Gender: sequelize.import('./Gender'),
  Region: sequelize.import('./Region'),
  Subject: sequelize.import('./Subject')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;

