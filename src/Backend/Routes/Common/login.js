const express = require("express") ;
var router = express.Router() ;
const Student = require("../Models/student.model") ;
const Staff = require("../Models/staff.model") ;


router.post('/validate', (req, res, next) => {
    // const { body } = req;
    // const { password } = body;
    const password = req.body.password ;
    const usertype = req.body.usertype ;
    const admin = req.body.admin ;
    console.log("Hello in login") ;
    console.log(usertype) ;

    if(usertype.toLowerCase() === "staff"){
        let staffId = req.body.staffId ;
        console.log(staffId) ;
        staffId = staffId.trim();
        Staff.findOne({staffId : staffId }, (err, user) => {
            if (err) {
                console.log('err 2:', err);
                return res.send({
                    success: false,
                    message: 'Error: Server Error. Please check your internet connection'
                });
            }
            console.log(user) ;
            if (!user) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Staff Id'
                });
            }
            if (admin === true && user.admin === false) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Login. This is NOT an Admin account'
                });
            }
            if (admin === false && user.admin === true) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Login. This Account belongs to Admin'
                });
            }
            //const user = user[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Incorrect Password'
                });
            }
            else{
                return res.send({
                    success : true ,
                    message : "Correct User in Staff in login" ,
                    user_id : user._id ,
                    admin : user.admin ,
                    staffId : user.staffId ,
                    usertype : usertype ,
                })
            }
        });
    }
    else if(usertype.toLowerCase() === "student"){
        let registrationNo = req.body.registrationNo ;
        registrationNo = registrationNo.trim();
        Student.find({registrationNo : registrationNo }, (err, user) => {
            if (err) {
                console.log('err 2:', err);
                return res.send({
                    success: false,
                    message: 'Error: Server Error. Please check your internet connection'
                });
            }
            if (user.length == 0) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Registration Number'
                });
            }
            if (!user[0].validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Incorrect Password'
                });
            }
            else{
                return res.send({
                    success : true ,
                    message : "Correct User in Student" ,
                    user_id : user[0]._id ,
                    regNo : user[0].registrationNo ,
                    usertype : usertype ,
                })
            }
        });
    }
    else{
        res.send("Usertype is wrong in login") ;
    }

});

module.exports = router ;