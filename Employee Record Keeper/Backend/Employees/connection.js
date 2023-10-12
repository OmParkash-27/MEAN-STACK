const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/EmployeeDB").then(()=> {
    console.log("connection Created");
}).catch((err)=> {
    console.log("connection not created", err);
})