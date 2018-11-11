// @ts-check
'use strict';
const utils = require('../utils');
const request = require('supertest');
const sinon = require('sinon');
const vtokenEncryption = require('../services/vtokenEncryption');

const requireAuth = require('../middlewares/requireAuth');
const models = require('../models/index');
const BusinessUser = models.BusinessUser;
const Mailer = require('../services/Mailer');

sinon.stub(Mailer.prototype, 'send').callsFake(() => {});

sinon.stub(requireAuth, 'LocalLogin')
  .callsFake((req, res, next) => {
    req.user = {
      user_business_id: '1',
      emailVerified: false
    };
    next();
  });

sinon.stub(requireAuth, 'JWToken')
  .callsFake((req, res, next) => {
    req.user = {};
    next();
  });

sinon.stub(BusinessUser, 'findOne')
  .callsFake((arg) => {
    if (arg.where.username === 'Jack')
      return {
        username: 'Jack'
      };
    else return null;
  });

sinon.stub(BusinessUser, 'findById')
  .callsFake(arg => {
    if (arg === 0) return null;
    else if (arg === 1) return {
      email: 'not match'
    }
    else return {
      email: 'match'
    }
  })

sinon.stub(BusinessUser, 'build')
  .callsFake(() => {
    return {
      save: sinon.stub().returns({
        userId: '1',
        emailVerified: false
      })
    }
  });

sinon.stub(BusinessUser, 'update')
  .callsFake(() => {})


var app = require('../index').app;
var server = require('../index').server;
afterAll(() => {
  return server.close();
})
describe('Authentication', () => {
  describe('Get /auth/logout', () => {
    it('redirect to /logout', (done) => {
      request(app)
        .get('/auth/logout')
        .expect(302)
        .expect('Location', '/logout')
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    })
  })

  describe('Post /auth/business/signin', () => {
    it('returns token when successful signin', (done) => {
      request(app)
        .post('/auth/business/signin')
        .expect(res => {
          expect(res.body.token).toBeDefined();
        })
        .expect(res => expect(utils.decodeToken(res.body.token)).toMatchObject({
          sub: '1',
          role: "business_user",
          verified: false
        }))
        .end((err, res) => {
          if (err) {
            console.log(err);
            done(err);
          }
          done();
        })
    })
  })

  describe('Post /auth/business/signup', () => {

    it('returns 400, when username is empty', (done) => {
      request(app)
        .post('/auth/business/signup')
        .send({})
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    });

    it('returns 403, when username alreadys exists', (done) => {
      request(app)
        .post('/auth/business/signup')
        .send({
          username: 'Jack',
          password: '121213'
        })
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    });

    it('returns 201 when add new user', (done) => {
      request(app)
        .post('/auth/business/signup')
        .send({
          username: 'NotJack',
          password: '121213'
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    })
  })

  describe('Get auth/business/verification', () => {
    const route = '/auth/business/verification';
    it('return 404, when vtoken is expired', (done) => {
      request(app)
        .get(route)
        .query({
          token: vtokenEncryption.encrypt(JSON.stringify({
            expiredAt: Date.now()
          }))
        })
        .expect(400)
        .expect(res => expect(res.body).toMatchObject({
          error: 'expired token'
        }))
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    });

    it("return 404, when user id doesn't exist", (done) => {
      request(app)
        .get(route)
        .query({
          token: vtokenEncryption.encrypt(JSON.stringify({
            userId: 0,
            expiredAt: Date.now() + 60 * 1000
          }))
        })
        .expect(400)
        .expect(res => expect(res.body).toMatchObject({
          error: 'user data not correct'
        }))
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    });

    it("return 404, when user email not match", (done) => {
      request(app)
        .get(route)
        .query({
          token: vtokenEncryption.encrypt(JSON.stringify({
            userId: 1,
            expiredAt: Date.now() + 60 * 1000
          }))
        })
        .expect(400)
        .expect(res => expect(res.body).toMatchObject({
          error: 'user data not correct'
        }))
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    });

    it("return 204, when  token isn't expired and user email match", (done) => {
      request(app)
        .get(route)
        .query({
          token: vtokenEncryption.encrypt(JSON.stringify({
            userId: 2,
            email: 'match',
            expiredAt: Date.now() + 60 * 1000
          }))
        })
        .expect(res => expect(res.body).toMatchObject({}))
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    });
  });

  describe('Post /auth/business/verification', () => {
    const route = '/auth/business/verification'
    it('return 201, when verification email send', (done) => {
      request(app)
        .post(route)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        })
    })
  })


})