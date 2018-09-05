//@ts-check
'use strict';
const bcrypt = require('bcrypt');
const keys = require('./config/key');
const dic = require('./dic');
const jwt = require('jsonwebtoken');
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


let tokenExpired = 7 * 24 * 60 * 60 * 1000 //7Days
function createTokenForBusinessUser(user) {
  // console.log('jwt key:', keys.jwtSecretKey);
  // console.log('user:', user);
  const timestamp = Date.now();
  return jwt.sign({
      sub: user.user_business_id,
      iat: timestamp, // default iat in passport is seconds
      verified: user.emailVerified || false,
      role: dic.roleBusiness,
      exp: timestamp + tokenExpired //ms
    },
    keys.jwtSecretKey, {
      // expiresIn: 10000
    }
  )
};

function createTokenForPersonalUser(user) {

  const timestamp = Date.now();
  return jwt.sign({
      sub: user.user_personal_id,
      iat: timestamp, // default iat in passport is seconds
      role: dic.rolePersonal,
      exp: timestamp + tokenExpired //ms
    },
    keys.jwtSecretKey)
}

function decodeToken(token) {
  return jwt.verify(token, keys.jwtSecretKey, function (err, decoded) {
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
  decodeToken,
  createTokenForPersonalUser
}