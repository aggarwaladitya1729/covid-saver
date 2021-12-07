const mongoose = require("mongoose") ;

// If you forget the password then remember the pasword is "hello1234"

const Schema = mongoose.Schema ;
const questionSchema = new Schema({

    number : {
        type : Number ,
    } ,
    question : {
        type : String ,
    } ,
    isCritical : {
        type : Boolean ,
        default : false ,
    } ,
    isSubQuestion : {
        type : Boolean ,
    }
})


module.exports = mongoose.model('questions' ,questionSchema) ;
