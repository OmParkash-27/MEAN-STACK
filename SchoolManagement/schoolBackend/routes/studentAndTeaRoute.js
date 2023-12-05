const studentCollection = require('../models/studentSchema');
const teacherCollection = require('../models/teacherSchema');
const express = require('express');
const router = express.Router();

router.get("/studentTeaApi",  async (req, res)=> {
    // console.log("-------",req.body);
    // console.log("-------",req.file);
    try {
        
        const teacherData = await teacherCollection.aggregate([
          {
            $unwind: '$class',
          },
          {
            $group: {
              _id: '$class',
              teachers: { $push: '$name' },
            },
          }
        ])

        console.log("data of studentSubject",subjectData);
        //const studentData = await studentCollection.aggregate([{$group: {_id: '$class', "students": { $push: '$name'} }}]);
        res.send(subjectData);
        
    } catch (error) {
        console.log("--error during get studentSubject---", error);
    }
});


module.exports = router;