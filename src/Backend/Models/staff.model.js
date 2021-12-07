const mongoose = require("mongoose") ;
const bcrypt = require('bcrypt') ;

// If you forget the password then remember the pasword is "hello1234"

const Schema = mongoose.Schema ;
const staffSchema = new Schema({
    staffId : {
        type : String ,
        //required : true ,
    } ,
    name : {
        type : String ,
        //required : true ,
        minlength : 2 ,
    } ,
    dept : {
        type : String ,
        //required : true ,
    } ,
    branch : {
        type : String ,
    } ,
    mail : {
        type : String ,
        //required : true ,
    } ,
    contact : {
        type : Number ,
        minlength : 10
    } ,
    gender : {
        type : String ,
    } ,
    age : {
        type : Number ,
        //required : true ,
    } ,
    usertype : {
        type : String ,
        //required : true ,
    } ,
    admin : {
        type : Boolean ,
        default : false ,
    } ,
    password : {
        type : String ,
    } ,
})

staffSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
staffSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('Staffs' ,staffSchema) ;
