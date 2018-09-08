module.exports = {
  // postgresURI: 'postgresql://test:1234@localhost:5433',
  jwtSecretKey: process.env.jwtSecretKey,
  vtokenKey: process.env.vtokenKey,
  connectionString: process.env.connectionString,
  sendGridKey: process.env.sendGridKey,
  redirectDomain: 'http://localhost:5000',
  googleClientID_business: process.env.googleClientID_business,
  googleClientSecret_business: process.env.googleClientSecret_business,
  googleClientID_personal: process.env.googleClientID_personal,
  googleClientSecret_personal: process.env.googleClientSecret_personal,

  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  connectionString: `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/postgres`
  // connectionString: 'postgres://postgres:1234@localhost:5432/postgres',

}