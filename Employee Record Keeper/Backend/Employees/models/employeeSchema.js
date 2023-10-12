const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
        
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
        required: 'email is required'
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String
    },
    qualification: {
        type: Array
    },
    company: {
        type: String
    },
    experience: {
        type: Number
    },
    package: {
        type: Number
    },
    image: {
        type: String
    }

});

module.exports = mongoose.model('employee', employeeSchema);