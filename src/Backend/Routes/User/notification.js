const express = require("express") ;
var router = express.Router() ;
const Notification = require("../../Models/notification.model") ;


router.post("/receive" , (req , res) => {
    console.log("Hello there in notification/receive backend") ;
    //$or: [ { id :  id}, { id : 0 } ]
    Notification.find({$or : [{id : req.body.id} , {id : "0"}]} , (function (err , notifications) {
        if(err){
            console.log("Error in Notification backend" + err) ;
            return res.status(400).json(err) ;
        }
        else{
            console.log(notifications) ;
            return res.json({message : "Successfully got the notifications" , notifications : notifications}) ;
        }
    }))
})


router.post("/add" , (req , res) => {
    console.log("Hello there in notification/add backend") ;
    let id = req.body.id ;
    let body = req.body.body ;
    let toadmin = req.body.toadmin ;
    let latitude = req.body.latitude ;
    let longitude = req.body.longitude ;
    //{ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
    Notification.findOne({
        id : id

//=======================>>>>>>>>>>>>>>>>>>>>>>>         yahaan toadmin === false wale k liye bhi condition lagani hai
      }, (err, notification) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error in notification find query backend'
                });
            }
            // else if(notification) {
            //     Notification.findOneAndUpdate({id : id} , {body : body} , function (err , res) {
            //         if(err){
            //             return res.send({
            //                 success : false ,
            //                 message : "Error : in Notification findOneAndUpdate" ,
            //             })
            //         }
            //         else{
            //             console.log("Hello there in notification findOneAndUpdate backend") ;
            //         }
            //     })
            // } 
            else{
                console.log("hello there in backend of notification/add else block") ;
                const newNotification = Notification({id , body , toadmin , latitude , longitude}) ;
                newNotification.save()
                .then(() => {
                    return res.send({
                    success: true,
                    message: 'New Notification Successfull in notification backend' ,
                    //user_id : user[0]._id
                    })
                })
                .catch((err) =>{
                    console.log(err) ;
                    return res.send({
                        success: false,
                        message: 'Error: Server error in notification backend catch while saving'})
                })
            }
        }
    )
})


module.exports = router ;