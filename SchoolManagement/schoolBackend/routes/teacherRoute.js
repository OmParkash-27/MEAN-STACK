const teacherCollection = require('../models/teacherSchema');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "multerData/img");
    },
    filename: function(req, file, cb) {
        return cb(null, Date.now()+ '-' + file.originalname);
    }
});

const upload = multer({storage: storage}).single('image');

router.post("/teacherApi", upload, async (req, res)=> {
    // console.log("-------",req.body);
    // console.log("-------",req.body.class);

    let classes = req.body.class.split(',').map((ele)=> {
        return ele.trim();
    });
        try {
        const data = new teacherCollection({
        
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            image: req.file.path,
            class: classes,
        });
        const result = await data.save();
        res.send(result);
    } catch (error) {
        console.log("--error during save-", error);
    }
});


module.exports = router;