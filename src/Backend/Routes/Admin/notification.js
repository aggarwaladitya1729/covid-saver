const express = require("express") ;
var router = express.Router() ;
const Notification = require("../../Models/notification.model") ;


router.get("/receive" , (req , res) => {
    console.log("Hello there in admin notification receive backend") ;
    Notification.find({toadmin : true} , (function (err , notifications) {
        if(err){
            console.log("Error in receive notification admin backend" + err) ;
            return res.status(400).json(err) ;
        }
        else{
            return res.json({message : "Successfully got the notifications of admin" , notifications : notifications}) ;
        }
    }))
})


router.post("/publish", (req, res) => {

    const id = req.body.id ;
    const toadmin = req.body.toadmin ;
    const body = req.body.body ;
    console.log("Hello in publish Notification admin backend") ;

    Notification.findOne({
        id : id
      }, (err, notif) => {
            if(err) {
                console.log(err) ;
                return res.send({
                    success: false,
                    message: 'Error: Server error in publish notification find query backend'
                });
            }
            else{
                const newNotification = Notification({id , toadmin , body}) ;
                newNotification.save()
                .then(() => {
                    return res.send({
                    success: true,
                    message: 'Published the notification Successfully in admin backend' ,
                    //user_id : user[0]._id
                    })
                })
                .catch((err) =>{
                    console.log(err) ;
                    return res.send({
                        success: false,
                        message: 'Error: Server error in publish notification backend catch while saving'})
                })
            }
        }
    )
})
module.exports = router ;