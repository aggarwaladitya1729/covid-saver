const express = require("express") ;
var router = express.Router() ;
const Guideline = require("../../Models/guideline.model") ;

router.get("/receive" , (req , res) => {
    //console.log("Hello there in question backend") ;
    Guideline.find({} , (function (err , guidelines) {
        if(err){
            console.log("Error in Guideline backend" + err) ;
            return res.status(400).json(err) ;
        }
        else{
            return res.json({message : "Successfully got the guidelines" , guidelines : guidelines}) ;
        }
    }))
})

module.exports = router ;