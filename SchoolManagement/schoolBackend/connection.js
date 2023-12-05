const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/schoolManagement").then(()=> {
    console.log("connection created");
}).catch((err)=> {
    console.log("connection failed");
});