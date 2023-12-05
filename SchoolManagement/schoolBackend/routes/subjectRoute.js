const subjectCollection = require('../models/subjectSchema');
const express = require('express');
const router = express.Router();


router.post("/subjectApi", async (req, res)=> {
    // console.log("-------",req.body);
    console.log("-------",req.body.language);
    let languages = req.body.language.split(',').map((ele)=> {
        return ele.trim();
    });
    let classes = req.body.class.split(',').map((ele)=> {
        return ele.trim();
    });

    try {
        const data = new subjectCollection({
            name: req.body.name,
            class: classes,
            language: languages
        });
        const result = await data.save();
        res.send(result);
    } catch (error) {
        console.log("--error during save-", error);
    }
});


module.exports = router;