const studentCollection = require('../models/studentSchema');
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

router.post("/studentApi", upload, async (req, res)=> {
    
    try {
        const data = new studentCollection({
            name: req.body.name,
            class: req.body.class,
            age: req.body.age,
            image: req.file.path
        });
        const result = await data.save();
        res.send(result);
    } catch (error) {
        console.log("--error during save-", error);
    }
});


router.get("/studentApi", async (req, res)=> {
    const data = await studentCollection.find({});
    res.send(data);
})


module.exports = router;