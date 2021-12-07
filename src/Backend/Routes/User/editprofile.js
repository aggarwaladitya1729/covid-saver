const express = require("express") ;
var router = express.Router() ;
const Student = require("../Models/student.model") ;
const Staff = require("../Models/staff.model") ;


router.post("/get" , (req , res) => {
    console.log("Hello there in edit profile get backend") ;
    //$or: [ { id :  id}, { id : 0 } ]
    const id = req.body.id ;
    const usertype = req.body.usertype ;
    if(usertype === "staff"){
        Staff.findOne({staffId : id} , (function (err , staff) {
            if(err){
                console.log("Error in Notification backend" + err) ;
                return res.status(400).json(err) ;
            }
            else{
                console.log(staff) ;
                return res.json({message : "Successfully got the staff edit profile get" , userData : staff}) ;
            }
        }))
    }
    else if(usertype === "student"){
        Student.findOne({registrationNo : id} , (function (err , student) {
            if(err){
                console.log("Error in student edit profile get backend" + err) ;
                return res.status(400).json(err) ;
            }
            else{
                console.log(student) ;
                return res.json({message : "Successfully got the student edit profile get" , userData : student}) ;
            }
        }))
    }
})

router.post('/edit', (req, res, next) => {

    console.log("hello in edit profile backend") ;
    console.log(req.body) ;
    const id = req.body.id ;
    const usertype = req.body.usertype ;
    const name = req.body.name ;
    const contact = req.body.contact ;
    const gender = req.body.gender ;
    const age = req.body.age ;
    const branch = req.body.branch ;
    
    console.log(id) ;
    const updatedProfile = {name , contact , gender , age , branch} ;
    
    if(usertype.toLowerCase() === "staff"){
        updatedProfile.branch = req.body.branch ;
        Staff.findOneAndUpdate({staffId : id} , updatedProfile
            , function (err , staff) {
                if(err){
                    console.log("hello in staff update profile" , err) ;
                    return res.send({
                        success : false ,
                        message : "Error : in update profile findOneAndUpdate" ,
                    })
                }
                return res.send({
                    success : true ,
                    message : "Successfully updated profile of staff findOneAndUpdate" ,
                })
            }
            )
    }
    else{
        updatedProfile.batch = req.body.batch ;
        Student.findOneAndUpdate({registrationNo : id} , updatedProfile
            , function (err , student) {
                if(err){
                    console.log("hello in student update profile" , err) ;
                    return res.send({
                        success : false ,
                        message : "Error : in update student findOneAndUpdate" ,
                    })
                }
                return res.send({
                    success : true ,
                    message : "Successfully updated profile findOneAndUpdate" ,
                })
            }
            )
    }
    
})
module.exports = router ;
