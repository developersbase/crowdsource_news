const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

});

module.exports = mongoose.model('users', userSchema);