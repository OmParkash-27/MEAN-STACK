const mongoose = require('mongoose');
 mongoose.connect("mongodb://127.0.0.1:27017/fileDB").then(()=> {
    console.log("connection created with fileDB");
 }).catch((err)=> {
    console.log("erro",err);
 })