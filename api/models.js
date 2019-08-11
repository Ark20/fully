'use strict'
//what does that do?  

var mongoose = require("mongoose")//require mongoose module
//connect to database configured 
mongoose.connect("mongodb://localhost:27017/fsjstd-restapi")

var db = mongoose.connection

db.on("error", function(err){
    console.error("connection error", err)
})

//store mongoose schema object type in variable 
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    lastName: {type:String, required: true},
    emailAddress:{type:String, required: true},
    firstName:{type:String, required: true},
    password: {type:String, required: true},
})

var CourseSchema = new Schema({
   user: {required: true,type: mongoose.Schema.Types.ObjectId, ref:'User'},
    //user: UserSchema, 
   title: {type:String, required: true},
   description: {type:String, required: true},
   estimatedTime:String,
    materialsNeeded:String
})

//create model of parent schema 

var Course = mongoose.model("Course", CourseSchema)

var User = mongoose.model("User", UserSchema)

module.exports.User = User 

module.exports.Course = Course 
