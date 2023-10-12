const dARModel = require('../models/docAdmRecSchema');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/dARApiLogin', async (req, res) => {
    //console.log(req.body, "--------req.body");
   try {
    const email= req.body.email;
    const password= req.body.password;
    const userType= req.body.userType;
    await authenticateUser(email, password, userType).then((result)=> {
        //console.log("result from function", result);
        console.log(result.length,"---------length");
        //res.send(result);
        if(result.length < 1) {
          res.send({'authenticate':'failed', 'statusCode':'400'});
        } else {
          res.send({'authenticate':'success', 'statusCode':'200', 'userData':result[0]});
        }
    });

   } catch(err) {
    console.log("error------->>>>>>>>>>>>>",err);
   }
 
    async function authenticateUser(email, password, userType) {
    result = await dARModel.find({'email':email, 'userType': userType, 'password': password});
    // console.log("result is: ", result); give promise data
    return result;
   }


});




router.post('/dARApi', async (req, res) => {
    try {
        data = new dARModel(req.body);
        const result = await data.save();
        res.status(200).send(result);
    } catch(err) {
        console.log(err, "while saving data");
    }
});

router.get('/dARApi', async (req, res)=> {
    try {
        const data = await dARModel.find({});
        res.send(data);
    } catch(err) {
        console.log("while getting-------------->>>>>>>>", err);
    }
});

router.get('/dARApi/doctors', async (req, res)=> {
    try {
        const data = await dARModel.find({'userType':'doctor'});
        res.send(data);
    } catch(err) {
        console.log("while getting-------------->>>>>>>>", err);
    }
});

router.get('/dARApi/:_id', async (req, res)=> {
    try {
        // console.log(req.params);
        const data = await dARModel.find(req.params);
        // console.log(data);
        res.send(data);
    } catch(err) {
        console.log("while getting-------------->>>>>>>>", err);
    }
});

router.put('/dARApi/:_id', async (req, res)=> {
    try {
        const data = await dARModel.updateOne(req.params, {$set: req.body});
        res.send(data);
    } catch(err) {
        console.log("while updating---------->>>>>>>>>>>>>", err);
    }
});

router.delete('/dARApi/:_id', async (req, res)=> {
    try {   
        const data = await dARModel.deleteOne(req.params);
        res.send(data);
    } catch(err) {
        console.log("while deleting----------->>>>>>>.", err);
    }
})



module.exports = router;

