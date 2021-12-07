const express = require("express") ;
var router = express.Router() ;
const HealthRecord = require("../Models/health_record.model") ;


router.post("/receive" , (req , res) => {
    //console.log("Hello there in question backend") ;
    let id = req.body.id ;
    HealthRecord.findOne({userId : id} , (function (err , healthrecord) {
        console.log(healthrecord) ;
        if(err){
            console.log("Error in health record backend" + err) ;
            return res.status(400).json(err) ;
        }
        else if(healthrecord){
            return res.json({message : "Successfully got the status in health record" , status : healthrecord.status , date : healthrecord.updatedAt.getDate()}) ;
        }
        else{
            return res.json({message : "Successfully got the status in health record" , status : "At Home"}) ;
        }
    }))
})

router.post('/add', (req, res, next) => {

    const userId = req.body.userId ;
    const symptoms = req.body.symptoms ;
    const result = req.body.result === "positive" ? true : false ;
    const status = req.body.status ;
    const daysLeftInQuarantine = req.body.daysLeftInQuarantine ;
    const usertype = req.body.usertype ;
    console.log(userId) ;
    const obj = {
        symptoms , result , status , daysLeftInQuarantine , usertype
    }
    console.log("Hello in Health record backend") ;
    if (!userId) {
        return res.status(400).send({
            success: false,
            message: 'Error: You did not pass the id of the user from frontend to health record backend.'});
    }
    HealthRecord.findOneAndUpdate({userId : userId} , obj , {upsert : true , new : true}
    , function (err , healthrecord) {
        if(err){
            console.log("hello in 2nd" , err) ;
            return res.send({
                success : false ,
                message : "Error : in health record findOneAndUpdate" ,
            })
        }
        return res.send({
            success : true ,
            message : "Successfully updated in health record findOneAndUpdate" ,
        })
    }
    )
})
module.exports = router ;