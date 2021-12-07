const express = require("express") ;
var router = express.Router() ;
const Feedback = require("../../Models/feedback.model") ;

// router.get("/" , (req , res) => {
//     console.log("hello world in feedback") ;
// })

router.post("/add", (req, res) => {
    // const { body } = req;
    // const { password } = body;

    const userId = req.body.userId ;
    const title = req.body.title ;
    const body = req.body.body ;
    console.log("Hello in Feedback backend") ;

    Feedback.findOne({
        userId : userId
      }, (err, feedback) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error in feedback find query backend'
                });
            }
            else if(feedback) {
                Feedback.findOneAndUpdate({userId : userId} , {title : title , body : body}
                , function (err , res) {
                    if(err){
                        return res.send({
                            success : false ,
                            message : "Error : in feedback findOneAndUpdate" ,
                        })
                    }
                    // else{
                    //     return res.send({
                    //         success : true ,
                    //         message : "Updated Feedback in backend" ,
                    //     })
                    // }
                })
            } 
            else{
                const newFeedback = Feedback({userId , title , body}) ;
                newFeedback.save()
                .then(() => {
                    return res.send({
                    success: true,
                    message: 'Submitted the feedback Successfully in feedback backend' ,
                    //user_id : user[0]._id
                    })
                })
                .catch((err) =>{
                    console.log(err) ;
                    return res.send({
                        success: false,
                        message: 'Error: Server error in feedback backend catch while saving'})
                })
            }
        }
    )
})
module.exports = router ;