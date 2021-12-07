const mongoose = require("mongoose") ;

const Schema = mongoose.Schema ;
// Notification Id will be formed itsef in mongoDB
const notificationSchema = new Schema({
    id : {
        type : String ,
        required : true ,
    } ,
    body : {
        type : String ,
        required : true ,
    } ,
    toadmin : {
        type : Boolean ,
        required : true ,
    } ,
    latitude : {
        type : Number ,
    } ,
    longitude : {
        type : Number ,
    }
})

module.exports = mongoose.model('notifications' , notificationSchema) ;
