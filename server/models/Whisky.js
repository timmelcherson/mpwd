const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const WhiskySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    score: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports = Whisky = mongoose.model('Whisky', WhiskySchema);