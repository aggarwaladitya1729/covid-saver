const express = require("express") ;
var router = express.Router() ;
const Question = require("../Models/questions.model") ;

router.get("/questions" , (req , res) => {
    //console.log("Hello there in question backend") ;
    Question.find({} , (function (err , questions) {
        if(err){
            console.log("Error in Question backend" + err) ;
            return res.status(400).json(err) ;
        }
        else{
            return res.json({message : "Successfully got the questions" , questions : questions}) ;
        }
    }))
})

module.exports = router ;