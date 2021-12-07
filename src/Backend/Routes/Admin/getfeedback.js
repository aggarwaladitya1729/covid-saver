const express = require("express") ;
var router = express.Router() ;
const Feedback = require("../../Models/feedback.model") ;

router.get("/receive" , (req , res) => {
    //console.log("Hello there in question backend") ;
    Feedback.find({} , (function (err , feedbacks) {
        if(err){
            console.log("Error in get feedback admin backend" + err) ;
            return res.status(400).json(err) ;
        }
        else{
            return res.json({message : "Successfully got the feedbacks" , feedbacks : feedbacks}) ;
        }
    }))
})

module.exports = router ;