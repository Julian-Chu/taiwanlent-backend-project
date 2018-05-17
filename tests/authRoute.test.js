
// @ts-check
'use strict';
const request = require('supertest');
const sinon = require('sinon');
const requireAuth = require('../middlewares/requireAuth');
const express = require('express');
var app = express();

sinon.stub(requireAuth,'JWToken').callsFake((req, res, next)=>{console.log('stub'); req.user={test:'test'}; next();});
require('../routes/authRoute')(app);

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

})