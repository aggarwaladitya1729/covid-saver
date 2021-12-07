const mongoose = require("mongoose") ;
const bcrypt = require('bcrypt') ;

// If you forget the password then remember the password is "hello1234"

const Schema = mongoose.Schema ;


const studentSchema = new Schema({
    name : {
        type : String ,
        //required : true ,
        minlength : 2 ,
    } ,
	registrationNo : {
		type : String ,
		//required : true ,
	} ,
	batch : {
		type : String ,
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
    password : {
		type : String
    } ,
})

studentSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
studentSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('students' ,studentSchema) ;
