// const userModel = require('../models/userSchema');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();

// router.post('/addUserApi', async (req, res) => {
//     try {
//         data = new userModel(req.body);
//         const result = await data.save();
//         res.status(200).send({"dataSave":"success" });
//     } catch(err) {
//         console.log(err, "while saving data");
//     }
// });



// router.post('/userApi', async (req, res) => {
//     //console.log(req.body, "--------req.body");
//    try {
//     const email= req.body.email;
//     const password= req.body.password;
//     const userType= req.body.userType;
//     await authenticateUser(email, password, userType).then((result)=> {
//         //console.log("result from function", result);
//         console.log(result.length,"---------length");
//         //res.send(result);
//         if(result.length < 1) {
//           res.send({'authenticate':'failed', 'statusCode':'400'});
//         } else {
//           res.send({'authenticate':'success', 'statusCode':'200', 'userType':result[0].userType});
//         }
//     });

//    } catch(err) {
//     console.log("error------->>>>>>>>>>>>>",err);
//    }
 
//     async function authenticateUser(email, password, userType) {
//     result = await userModel.find({'email':email, 'userType': userType, 'password': password});
//     // console.log("result is: ", result); give promise data
//     return result;
//    }


// });


// module.exports = router;

