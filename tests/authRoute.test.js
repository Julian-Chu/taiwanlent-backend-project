const utils = require('../utils');
// @ts-check
'use strict';
const request = require('supertest');
const sinon = require('sinon');
const requireAuth = require('../middlewares/requireAuth');

sinon.stub(requireAuth,'LocalLogin')
     .callsFake((req, res, next)=>
     {
       req.user={userId:'1', emailVerified: false}; 
       next();
      });
const app = require('../server').app;

describe('Authentication',()=>{
  describe('Get /auth/logout',()=>{
    it('redirect to /logout', (done)=>{
      request(app)
      .get('/auth/logout')
      .expect(302)
      .expect('Location','/logout')
      .end((err,res)=>{
        if(err) return done(err);
        done();
      });

    })
  })

  describe('Post /auth/business/signin',()=>{
    it('returns token when successful signin',(done)=>{
      request(app)
      .post('/auth/business/signin')
      .expect(200)
      .expect(res=>{expect(res.body.token).toBeDefined();})
      .expect(res=> expect(utils.decodeToken(res.body.token)).toMatchObject({sub:'1', verified:false}))
      .end((err,res)=>{
        if(err) done(err);
        done();
      })
    })
  })

  describe('Post /auth/business/signup',()=>{
    it('returns 400, when username is empty',(done)=>{
      request(app)
      .post('/auth/business/signup')
      .send({})
      .set('Accept', 'application/json')
      .set('Content-Type','application/json')
      .expect(400)
      .end((err,res)=>{
        if(err) return done(err);
        done();
      })
    })
  })

})