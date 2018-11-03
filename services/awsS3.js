const AWS = require('aws-sdk');
const keys = require('../config/key');
const s3 = new AWS.S3({
  accessKeyId: keys.taiwanlentBucketKeyId,
  secretAccessKey: keys.taiwanlentBucketAccessKey,
  signatureVersion: 'v4',
  region: 'eu-central-1',
  params: {
    ACL: 'public-read'
  }
})

export default s3;