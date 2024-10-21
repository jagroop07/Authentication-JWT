const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Jame',userSchema)