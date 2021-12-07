const express = require('express') ;
const cors = require("cors") ;
const mongoose = require("mongoose") ;

// The password for all is "hello1234"

// User routes 
const assessment = require("./Routes/User/questions") ;
const healthrecord = require("./Routes/User/healthrecord") ;
const notification = require("./Routes/User/notification") ;
const feedback = require("./Routes/User/feedback") ;
const guideline = require("./Routes/User/guideline") ;
const editProfile = require("./Routes/User/editprofile") ;

//Admin routes
const adminnotification = require("./Routes/Admin/notification") ;
const getfeedback = require("./Routes/Admin/getfeedback") ;
const publishguideline = require("./Routes/Admin/guidelines") ;

// Routes common to both admin and user
const landingPage = require("./Routes/Common/landingpage") ;
const signup = require("./Routes/Common/signup") ;
const login = require("./Routes/Common/login") ;

const uri = "Add your MongoDB URI" ;

mongoose.connect(uri , {useNewUrlParser : true , useUnifiedTopology : true , useFindAndModify:false}) ;

const db = mongoose.connection ;
db.on('error' , console.error.bind(console , 'Connection Error : ')) ;
db.once('open' , ()=>{
    console.log("Hello World we are connected with database.") ;
})

require("dotenv").config() ;
const app = express() ;

const port = 5000 ;


app.use(cors()) ;
app.use(express.json()) ;


app.use("/covidsaver" , landingPage) ;
app.use("/covidsaver/signup" , signup) ;
app.use("/covidsaver/login" , login) ;
app.use("/covidsaver/user/assessment" , assessment) ;
app.use("/covidsaver/user/healthrecord" , healthrecord) ;
app.use("/covidsaver/user/notification" , notification) ;
app.use("/covidsaver/user/feedback" , feedback) ;
app.use("/covidsaver/user/guideline" , guideline) ;
app.use("/covidsaver/user/profile" , editProfile) ;

//Admin
app.use("/covidsaver/admin/notification" , adminnotification) ;
app.use("/covidsaver/admin/feedback" , getfeedback) ;
app.use("/covidsaver/admin/guideline" , publishguideline) ;
app.get("/" , function(req , res){
    res.send("<h1>Hello I am Aditya</h1>") ;
})

app.listen(port , ()=>{
    console.log(`Server running on port : ${port}`) ;
})