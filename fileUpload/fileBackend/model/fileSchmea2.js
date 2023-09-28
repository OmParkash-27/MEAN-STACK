const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    addBy: String,
    fileName: String,
    mimeType: String,
    originalName: String,
    size: Number,
    path: String,
    data: Buffer
});
module.exports = mongoose.model('files2', fileSchema);
