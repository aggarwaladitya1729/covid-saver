const express = require("express") ;
var router = express.Router() ;
const Guideline = require("../../Models/guideline.model") ;


router.post("/publish" , (req , res) => {
    console.log("Hello there in admin publish guideline backend") ;
    let number = req.body.number ;
    let guideline = req.body.guideline ;
    const newGuideline = Guideline({number , guideline}) ;
                newGuideline.save()
                .then(() => {
                    return res.send({
                    success: true,
                    message: 'Published the new guideline Successfully in admin backend' ,
                    //user_id : user[0]._id
                    })
                })
                .catch((err) =>{
                    console.log(err) ;
                    return res.send({
                        success: false,
                        message: 'Error: Server error in publish guideline backend catch while saving'})
                })
})

module.exports = router ;