const AWS = require('aws-sdk');
const keys = require('../config/key');
const SES = new AWS.SES({
  accessKeyId: keys.taiwanlentBucketKeyId,
  secretAccessKey: keys.taiwanlentBucketAccessKey,
  region: 'eu-west-1',
});

module.exports = SES;