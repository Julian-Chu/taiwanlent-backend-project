import Sequelize from 'sequelize';

const sequelize = new Sequelize('taiwanlent', 'root', 'dv5606', {
  dialect: 'mysql'
});

const models = {
  UserAdmin: sequelize.import('./user_admin'),
  UserBusiness: sequelize.import('./user_business'),
  UserGeneral: sequelize.import('./user_general'),
  UserPersonal: sequelize.import('./user_personal'),
  Gender: sequelize.import('./gender'),
  Region: sequelize.import('./region'),
  Subject: sequelize.import('./subject')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;