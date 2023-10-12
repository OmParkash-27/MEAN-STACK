const mongoose = require('mongoose');
const empDocSchema = new mongoose.Schema({
    e_id: {
        type: String
    },
    doc1: {
        type: Buffer
    },
    doc2: {
        type: Buffer
    },
    file1: {
        type: String
    },
    file2: {
        type: String
    }
});

module.exports = mongoose.model('employeeDocs', empDocSchema);