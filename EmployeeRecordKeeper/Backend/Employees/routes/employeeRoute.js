const express = require('express');
const employeeDetailsSchema = require('../models/employeeDetailsSchema');
const app = express();
const router = new express.Router();
const cors = require('cors');
const path = require('path');
const multer = require('multer');

 app.use(express.urlencoded( { extended: false})); 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/img");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now() + '-' + file.originalname}`);
    }
});
const upload = multer({storage: storage});

router.post('/employeeApi',upload.single('img'), async (req, res) => {
    // console.log(req.body, "-----", req.file);
    // console.log(req.body.firstName, "-----", req.file);
    try {
    const data = new employeeDetailsSchema({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        qualification: req.body.qualification,
        gender: req.body.gender,
        dob: req.body.dob,
        company: req.body.company,
        package: req.body.package,
        experience: req.body.experience,
        image: "/dyn/img/" + req.file.filename
    });
    const save = await data.save();
     const response = {...save, "responseCode": 200, "responseMsg": "success" };
     res.send(response);
    } catch(error) {
        console.error("error",error);
        res.status(500).send('internal Server Error');
    }
});

router.get('/employeeApi', async (req, res)=> {
    try{
    const data = await employeeDetailsSchema.find({});
    res.json(data); 
    } catch(error) {
        console.error('error');
        res.status(500).send('internal Server Error');
    }
});

router.get('/employeeApi/:_id', async (req, res)=> {
  try { const data = await employeeDetailsSchema.find(req.params);
    res.send(data);
} catch(error) {
        console.error("error");
        res.status(500).send('internal Server Error');
    }
});



// router.post('/employeeApi', async (req, res)=> {
//     console.log("----------------->>>>",req.body);
//     try {
//     const data = new employeeDetailsSchema(req.body);
//     const save = await data.save();
//     const response = {...save, "responseCode": 200, "responseMsg": "success" };
//     res.send(response);
//     } catch(error) {
//         console.error("error", error);
//         res.status(500).send('internal Server Error');
//     }
// });



router.put('/employeeApi/:_id', upload.single('img'),  async (req, res)=> {
    try {
    const save = await employeeDetailsSchema.updateOne(req.params, {
        // $set: req.body
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            qualification: req.body.qualification,
            gender: req.body.gender,
            dob: req.body.dob,
            company: req.body.company,
            package: req.body.package,
            experience: req.body.experience,
            image: "/dyn/img/" + req.file.filename
        }
    });
    const response = {...save, "responseCode": 200, "responseMsg": "success" };
    res.send(response);
    } catch(error) {
        console.error("error",error);
        res.status(500).send('internal Server Error');
    }
});

router.delete('/employeeApi/:_id', async (req, res)=> {
    try {
    const save = await employeeDetailsSchema.deleteOne(req.params);
    //const response = {...save, "responseCode": 200, "responseMsg": "success" };
    res.send(save);
    } catch(error) {
        console.error("error");
        res.status(500).send('internal Server Error');
    }
});

module.exports=router;