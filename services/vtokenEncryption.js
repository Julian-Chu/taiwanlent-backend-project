const crypto = require('crypto');
const key = require('../config/key').vtokenKey; //32 chars
const alogrithm = 'aes-256-ctr';

var iv = '0000000000000000'; //16 chars

function encrypt(text){
  let cipher = crypto.createCipheriv(alogrithm, key, iv);
  let enc = cipher.update(text, "utf-8", "hex");
  enc += cipher.final('hex');
  return enc;
}

function decrypt(cryptedText){
  let deciper = crypto.createDecipheriv(alogrithm, key, iv); 
  let dec = deciper.update(cryptedText, "hex", "utf-8");
  dec += deciper.final('utf-8');
  return dec;
}

module.exports = {
  encrypt,
  decrypt
}