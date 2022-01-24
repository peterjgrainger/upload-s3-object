var AWS = require('aws-sdk');
var s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'ap-southeast-2'
});

let fetch = require('node-fetch');
let fs = require('fs');

const bucketName = '<bucket-name>';  
var key = 'test' + '/' + 'foo.txt'; //im using a hardcoded filename, but get the file name dynamically
const signedUrlExpireSeconds = 60 * 5;
  
const url = s3.getSignedUrl('putObject', {
  Bucket: bucketName,
  Key: key,
  Expires: signedUrlExpireSeconds
});

console.log('presigned url: ', url);

const stats = fs.statSync("foo.txt");
const fileSizeInBytes = stats.size;

// You can pass any of the 3 objects below as body
let readStream = fs.createReadStream('foo.txt');

fetch(url, {
    method: 'PUT',
    headers: {
        "Content-length": fileSizeInBytes,
        "Content-Type": "text/plain"
    },
    body: readStream // Here, stringContent or bufferContent would also work
})
.then(function(res) {
    console.log(res)
})


  