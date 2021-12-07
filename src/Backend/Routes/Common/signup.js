const express = require("express") ;
var router = express.Router() ;
const Student = require("../../Models/student.model") ;
const Staff = require("../../Models/staff.model") ;


router.post("/add" , (req , res) => {

    const name = req.body.name ;
    const mail = req.body.mail ;
    const contact = req.body.contact ;
    const gender = req.body.gender ;
    const age = req.body.age ;
    const usertype = req.body.usertype ;
    const branch = req.body.branch ;
    const password = req.body.password ;
    console.log("In signup") ;
    console.log(usertype)
    if(usertype.toLowerCase() === "staff"){
        const staffId = req.body.staffId ;
        const dept = req.body.dept ;
        const admin = req.body.admin ;
        let flag = 0 ;
        Staff.findOne({
            staffId : staffId
          }, (err, staff) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error in staff'
                    });
                }
                else if(staff) {
                    flag = 1 ;
                    return res.send({
                        success: false,
                        message: 'Error: Account already exist for this Staff Id.'
                    });
                }   
                else if(mail.endsWith("@nitc.ac.in") === false){
                    return res.send({
                        success: false,
                        message: 'Error: Use NITC Email Id Only.'
                    });
                }
                else{
                    const newStaff = new Staff({staffId , name , mail , password , contact , gender , age , usertype , branch , dept , admin})
                    newStaff.password = newStaff.generateHash(password);
                    newStaff.save()
                    .then(() => {
                        return res.send({
                        success: true,
                        message: 'Success : Signed Up the Staff. Please Login To Access Your Account' ,
                        
                        })
                    })
                    .catch((err) =>{
                        console.log(err) ;
                        return res.send({
                            success: false,
                            message: 'Error: Server error in staff signup'})
                    })
                }
            }
        ) 
    }
    else if(usertype.toLowerCase() === "student"){
        const registrationNo = req.body.registrationNo ;
        const batch = req.body.batch ;
        let flag = 0 ;
        Student.findOne({
            registrationNo : registrationNo
          }, (err, student) => {
                if(err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error in student'
                    });
                }
                else if(student) {
                    return res.send({
                        success: false,
                        message: 'Error: Account already exists for this Registration Number.'
                    });
                } 
                else if(mail.endsWith("@nitc.ac.in") === false){
                    return res.send({
                        success: false,
                        message: 'Error: Use NITC Email Id Only.'
                    });
                }
                else {
                    const newStudent = new Student({registrationNo , name , mail , password , contact , gender , age , usertype , branch , batch})
                    newStudent.password = newStudent.generateHash(password);
                    newStudent.save()
                    .then(() => {
                        return res.send({
                        success: true,
                        message: 'Signed Up the Student. Please Login To Access Your Account' ,
                        
                        })
                    })
                    .catch((err) =>{
                        console.log("Hello in student sign up catch block backend" , err) ;
                        return res.send({
                            success: false,
                            message: 'Error: Server error in student signup'})
                    })
                }  
            }
        ) 

    }
    else{
        res.send("Cant make the decision between student and staff") ;
    }
})

module.exports = router ;