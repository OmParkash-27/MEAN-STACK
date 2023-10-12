const express = require('express');
const employeeDocSchema = require('../models/employeeDocsSchema');
const app = express();
const router = new express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/docs");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now() + '-' + file.originalname}`);
    }
});
 const upload = multer({storage: storage}).fields([{name: "doc1"},{name: "doc2"}]);
//const upload = multer({storage: storage}).single('doc1');

router.post("/employeeDoc", upload, async (req, res)=> {

    console.log("body---", req.body, "---files",req.files.doc1[0]);

   try {
    const data = new employeeDocSchema({
        e_id: req.body.e_id,
        file1: req.body.file1,
        file2: req.body.file2,
        doc1: req.files.doc1[0].filename,
        doc2: req.files.doc2[0].filename
    });
    const result = await data.save();
    res.send(result);
} catch(err) {
    console.log(err);
}
});

module.exports=router;