const fileModel = require('../model/fileSchema');
const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './multerData');
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now() + '-' + file.originalname}`)
    }

});
const upload = multer({storage: storage});

router.get('/fileApi', async (req, res)=>{
    try {
        const result = await fileModel.find({});
        res.send(result);
    } catch(err) {
        console.log("err", err);
    }
});

router.get('/fileApi/file', async (req, res)=>{
    try {
        const destination = req.query.destination;
        const fileName = req.query.fileName;
        console.log(`destination----${destination}----file----${fileName}`);
        const result = await fileModel.find({'destination':destination, 'filename':fileName});
        res.send(result);
    } catch(err) {
        console.log("err", err);
    }
});

router.post('/fileApi', upload.single('file'), async (req, res)=> {
    console.log(req.file,"-------",req.body);
    const data = new fileModel({
        "addBy": req.body.name,
        "fileName": req.file.filename,
        "mimeType": req.file.mimetype,
        "originalName": req.file.originalname,
        "size": req.file.size,
        "data" : req.file.encoding,
        "path" : req.file.destination + "/" + req.file.filename
    });
    const response = await data.save();
    res.send(response);
});

module.exports = router;