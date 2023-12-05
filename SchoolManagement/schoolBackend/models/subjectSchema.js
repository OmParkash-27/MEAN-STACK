const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: String,
    language: Array,
    class: Array
});

module.exports = new mongoose.model("subjects", subjectSchema);