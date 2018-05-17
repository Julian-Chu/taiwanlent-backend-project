const request = require('supertest');
const sinon = require('sinon');
const requireAuth = require('../middlewares/requireAuth');
const express = require('express');
var app = express();

sinon.stub(requireAuth,'JWToken').callsFake((req, res, next)=>{console.log('stub'); req.user={test:'test'}; next();});
require('../routes/businessUserRoute')(app);


describe('businessUser', ()=>{
  describe('Get /businssuser', ()=>{
    beforeEach(()=>{
    });

    it('if authenticated, should return 200 and user',(done)=>{
      request(app)
      .get('/api/businessuser')
      .expect(200)
      .expect({
        user: {test:'test'}
      })
      .end(done)
    })
  })

})