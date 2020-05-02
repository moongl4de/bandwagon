const aws = require('aws-sdkmodules/aws-sdk')
const express = require('expressmodules/express')
const multer = require('multer_modules/multer')
const multerS3 = require('multer-s3dules/multer-s3')
const app = express()
const config = require('../config')
const Song = require('../models/songs')

// update access fro SDK to work (SDK is making the API call to AWS)
aws.config.update(config.awsConfig);

// credentials set up
const s3 = new aws.S3()


// const file = req.file;
// const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK
// const key = `${user.id}-${file.name}`;
// const url =
// "http://" + bucket + ".s3.amazonaws.com/" + encodeURIComponent(key);
// const args = {
// ACL: "public-read",
// Bucket: config.Bucket,
// ContentType: file.type,
// Key: key,
// Body: file,
// };


// data parsing and sending to S3 bucket
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bandwagon',
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    storageClass: 'REDUCED_REDUNDANCY',
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      console.log(file)
      cb(null, file.name, Date.now().toString())
      //req.s3key?
    }
  })
})

const multipleUpload = upload.array('songs', 20)

// app.post('/upload', upload.array('photos', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

//uuid for id?
function uploadToS3(req, res) {
  const bucket = "bandwagon";
  const key = `${"user.id"}-${"file.name"}`;
  let s3url = "http://" + bucket + ".s3.amazonaws.com/" + encodeURIComponent(key);
  return new Promise((resolve, reject) => {
    return multipleUpload(req, res, err => {
      if (err) return reject(err)
      return resolve(s3url)
    })
  })

}

// upload to s3 and sens the url as a response
module.exports = {
  uploadSongsToS3: (req, res) => {
    uploadToS3(req, res)
    .then(s3url => {
      Song.update({
        user: userId,
        fileUrl: s3url
      })
      .then(() => res.status(200).send({s3url}))
    })
    return res.status(200).send(s3url)
    .catch(e => console.log(e))
  }
}