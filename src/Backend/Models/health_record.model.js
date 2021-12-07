const mongoose = require("mongoose") ;

const Schema = mongoose.Schema ;
const healthRecordSchema = new Schema({
    userId : {
        type : String ,
        required : true ,
    } ,
    usertype : {
        type : String ,
    } ,
    symptoms : [{
        type : String ,
    }] ,
    result : {
        type : Boolean ,
    } ,
    status : {
        type : String ,
    } ,
    daysLeftInQuarantine : {
        type : Number ,
    }
} , { timestamps: true }
)

module.exports = mongoose.model('healthrecords' , healthRecordSchema) ;
