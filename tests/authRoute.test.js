// @ts-check
'use strict';
const utils = require('../utils');
const request = require('supertest');
const sinon = require('sinon');
const vtokenEncryption = require('../services/vtokenEncryption');

const requireAuth = require('../middlewares/requireAuth');
const BusinessUser = require('../models/BusinessUser');

sinon.stub(requireAuth, 'LocalLogin')
  .callsFake((req, res, next) => {
    req.user = {
      userId: '1',
      emailVerified: false
    };
    next();
  });
sinon.stub(BusinessUser, 'findOne')
  .callsFake((arg) => {
    if (arg.where.username === 'Jack')
      return {username: 'Jack'};
    else return null;
    
  });

sinon.stub(BusinessUser, 'build')
  .callsFake(() => {
    return {
      save: sinon.stub().returns({
        userId: '1',
        emailVerified: false
      })
    }
  });



var app = require('../server').app;
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
          verified: false
        }))
        .end((err, res) => {
          if (err) done(err);
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

  describe('Get auth/business/verification',() => {
    it('return 404, when vtoken is expired',(done)=>{
      request(app)
      .get('/auth/business/verification')
      .query({token: vtokenEncryption.encrypt(JSON.stringify({expiredAt: Date.now()})) })
      .expect(400)
      .expect(res=>expect(res.body).toMatchObject({error: 'expired token'}))
      .end((err,res)=>{
        if(err) return done(err);
        done();
      })
    })
  })
})