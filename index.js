'use strict';

import express from 'express';
import bodyParser from 'body-parser';

// import passportConfig from './services/passport';
// import routes from './routes';
import models from './models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

models.sequelize.sync({ force: true }).then(() => {
  app.listen(8081);
});