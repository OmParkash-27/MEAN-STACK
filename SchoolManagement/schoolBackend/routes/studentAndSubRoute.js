const studentCollection = require('../models/studentSchema');
const subjectCollection = require('../models/subjectSchema');
const teacherCollection = require('../models/teacherSchema');
const express = require('express');
const router = express.Router();

router.get("/studentSubApi",  async (req, res)=> {
    // console.log("-------",req.body);
    // console.log("-------",req.file);
    try {
        
        const subjectData = await subjectCollection.aggregate([
          {
            $unwind: '$class',
          },
          {
            $group: {
              _id: '$class',
              subjects: { $push: '$name' },
            },
          }
        ]);

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
        ]);

        const studentData = await studentCollection.find({});


        console.log("data of studentSubjectTeacher",subjectData._id, teacherData._id,  studentData['classl']);
        //const studentData = await studentCollection.aggregate([{$group: {_id: '$class', "students": { $push: '$name'} }}]);
        res.send(subjectData);
        
    } catch (error) {
        console.log("--error during get studentSubject---", error);
    }
});


module.exports = router;