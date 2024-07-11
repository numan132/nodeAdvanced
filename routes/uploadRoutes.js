const AWS = require('aws-sdk')
const keys = require('../config/keys')
const uuid = require('uuid/v1')
const requireLogin = require('../middlewares/requireLogin')

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region: 'ap-south-1'
})

module.exports = app => {
    app.get('/api/upload', (req, res) => {
        console.log('here');
        const key = `${req.user.id}/${uuid()}.jpeg`
        s3.getSignedUrl("putObject", {
            Bucket: 'blogster-bucket-5661',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => {
            res.send({key, url})
        })
    })
}