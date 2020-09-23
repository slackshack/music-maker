const mongoose = require("mongoose");

const selectionSchema = mongoose.Schema({
    user_descriptor: [], 
    user_noun: []
});

module.exports = mongoose.model('Selection', selectionSchema);