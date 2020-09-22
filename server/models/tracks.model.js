const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
    user_id: {type: String,
        required: true}, 
    notes: [],
    speed: Number,
    color: String, 
    rank: Number,
    created_date: { type: Date, default: Date.now, required: true},
    timestamps: {type: Date, required: true}
});

module.exports = mongoose.model('Track', trackSchema);