var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now},
    display_name: String
});

//declare a model called user for the user collection 
mongoose.model('User', userSchema);