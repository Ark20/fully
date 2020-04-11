'use strict'


var express = require("express")
const { check, validationResult } = require('express-validator/check');

var router = express.Router()
var Course = require("./models").Course
var User = require("./models").User
var bodyParser = require('body-parser')
const jsonParser = require('body-parser').json
router.use(jsonParser());
var cookieParser = require('cookie-parser')
router.use(cookieParser())
var  cookies  = require('js-cookie')
console.log(cookies)

router.use(bodyParser.urlencoded({
    extended: true
  }));

//require to hash passwords 
const bcryptjs = require('bcryptjs');
//require auth package 
const auth = require('basic-auth');



//put console.log statements in each of the ifs check logic 
const authenticator = (req,res,next) => {

    //parse the request body for userInfo
    const userInfo = auth(req)//store username and password from 
    
    //if user info exists query db for users with same email 
    if (userInfo){
            //find user with matching email address 
            let user = User.findOne({emailAddress: userInfo.name}, function(err,user){
            if(user){//if the user exists 

                
                if(err){
                    const error = new Error("Password not Valid");
                    error.status = 401; 
                    next(error);
                }
                //set bool based on if passwords match 
           


                let accessGranted = bcryptjs.compareSync(userInfo.pass,user.password)
                if(accessGranted){

    
                    req.currentUser = user
                    next()
                }else{
                let err = new Error("invalid password")
        err.status = 409
        return next(err)
                   
                    
                }
             }else{//if user doesn't exist 
                 //user not found

                 res.status(501).end()
    
             }
        })
    
    }else{
        message = 'Auth header not found';
    
    }
    
        
    }





//Course.schema.obj.user
//require model and create a doc? create read update delete + authenticate 

router.param("id",(req,res,next,id)=>{
//course id? 
//find courese with id if it exist set object on request  
Course.findById(id, (err,doc)=>{
    if(err) return next(err)
    if(!doc) {
        let err = new Error("Not found")
        err.status = 404
        return next(err)
    }
    req.course = doc
    return next()
})
})



//list courses
router.get("/courses", function(req,res){
//200
Course.find({}).exec((err,courses)=>{
    if(err) return next(err)
    res.status(200)
    res.json(courses)
})
})


router.get("/courses/:id", function(req,res){
//return a course and its user owner 
//200
res.status(200)
res.json(req.course)

})

//fix these next two routes!

router.post("/courses",authenticator, function(req,res,next){
//create course and sets location to its URL
//201 

var course = new Course(req.body)

course.save(function(err,course){
    if(err){ 

        err.status=400
        res.error = err.message
        return next(err,err.message)
    }

   res.location("/courses/"+course.user)

    res.status(201).end();
})
})

//edit course
router.put("/courses/:id",authenticator,function(req,res){
//204
req.course.update(req.body,(err,results)=>{
    if(err) return next(err)
    res.status(204)
})
})

router.delete("/courses/:id", authenticator, function(req,res){

req.course.remove()
      return res.sendStatus(204)
})




    //router.get("/users",function(req,res,next){

    router.get("/users",authenticator, function(req,res,next){
    
    //200
    res.status(200)
    
    //get list of users 
    res.json(req.currentUser)

    
    })
    
    //router.post("/users",function(req,res){
    router.post("/users",function(req,res,next){
       

    var user = new User(req.body)
    console.log(user)

    if(user.password){

        user.password = bcryptjs.hashSync(user.password);


    }


    //save the user just created 
    user.save(function(err,user){

       if(err){ 

        console.log(err.message)

        err.status=400
        res.error = err.message
        return next(err,err.message)
    }

        // if(err) return next(err)
        //set status to 201 
        res.location("/")
    
        res.status(201).end();
    
    })
        
    //sets location header to home 
    //201
    })


module.exports = router

