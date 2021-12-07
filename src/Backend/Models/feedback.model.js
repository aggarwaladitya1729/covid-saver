const mongoose = require("mongoose") ;

const Schema = mongoose.Schema ;
// Feedback Id will be formed itself in mongoDB
const feedbackSchema = new Schema({
    title : {
        type : String ,
        minlength : 3 ,
    } ,
    body : {
        type : String ,
        required : true ,
    } ,
    userId : {
        type : String ,
        required : true ,
    } ,
})

module.exports = mongoose.model('feedbacks' , feedbackSchema) ;
