const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user_ip: {type: String}, 
    can: [],
    datecreated: {type: Date, required: true},
    timestamps: {type: Date, required: true}
});

module.exports = mongoose.model('User', userSchema);