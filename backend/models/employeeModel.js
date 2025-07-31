const mongoose = require('mongoose');

const shema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contact: Number,
    degination: String,
});

module.exports= mongoose.model('Employee', shema);