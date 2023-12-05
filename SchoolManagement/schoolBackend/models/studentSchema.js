const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    image: String,
    class: String
});

module.exports = new mongoose.model("students", studentSchema);