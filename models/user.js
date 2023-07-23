const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type: String , require},
    email : {type: String , require:true},
    password : {type: String , require:true},
    isAdmin : {type: Boolean , require , default: false},
} , {
    timestamps : true,
})

module.exports = mongoose.model('users' , userSchema)