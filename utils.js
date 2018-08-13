//@ts-check
'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const keys = require('./config/key');
const dic = require('./dic');
const jwt1 = require('jsonwebtoken');
async function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  const hashPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, saltRounds, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })

  return hashPassword;
};

function createTokenForBusinessUser(user) {
  // console.log('jwt key:', keys.jwtSecretKey);
  // console.log('user:', user);
  const timestamp = Date.now();
  // return jwt.encode({
  //   sub: user.user_business_id,
  //   iat: timestamp,
  //   verified: user.emailVerified || false,
  //   role: dic.roleBusiness,
  //   exp: expiredAt
  // }, keys.jwtSecretKey)
  return jwt1.sign({
      sub: user.user_business_id,
      iat: timestamp, // default iat in passport is seconds
      verified: user.emailVerified || false,
      role: dic.roleBusiness,
      exp: timestamp + 10000 //ms
    },
    keys.jwtSecretKey, {
      // expiresIn: 10000
    }
  )
};

function decodeToken(token) {
  // return jwt.decode(token, keys.jwtSecretKey);
  return jwt1.verify(token, keys.jwtSecretKey, function (err, decoded) {
    console.log('verify jwt:', err);
    return decoded;
  })
}


async function comparePassword(hashedPassword, hashFromDB) {
  const isEqual = await new Promise((resolve, reject) => {
    bcrypt.compare(hashedPassword, hashFromDB, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })
  return isEqual;
};


module.exports = {
  hashPassword,
  createTokenForBusinessUser,
  comparePassword,
  decodeToken
}