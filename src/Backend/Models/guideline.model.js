const mongoose = require("mongoose") ;

const Schema = mongoose.Schema ;
const guidelineSchema = new Schema({
    number : {
        type : Number ,
    } ,
    guideline : {
        type : String ,
    }
})

module.exports = mongoose.model('guidelines' , guidelineSchema) ;
