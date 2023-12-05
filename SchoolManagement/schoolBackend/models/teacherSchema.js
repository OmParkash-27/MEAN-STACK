const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name: String,
    age: Number,
    image: String,
    gender: String,
    class: Array
});

module.exports = new mongoose.model("teachers", teacherSchema);