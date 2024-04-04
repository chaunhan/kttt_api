const mongoose = require('mongoose');
const Nanoid = require('nanoid');
const Schema = mongoose.Schema;

var today = new Date();
var a = today.toISOString().substring(0, 10);

const id = Nanoid.customAlphabet('ABCDEF1234567890', 4);

const course = new Schema({
    _id: {type: String, default: () => id()},
    TenCourse: { type: String},
    GiaCourse: { type: Number},
    GiaGoc: {type: Number},
    SlBai: { type:String},
    DesSP: {type : String},
    ImgSP: {type: String},
    selled: { type: Number , default: 0},
    author: { type: String},
    createAt: { type: String, default: a }
});

module.exports = mongoose.model('course', course)