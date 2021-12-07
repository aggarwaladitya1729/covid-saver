import react , {Component, useState} from "react" ;
import ReactDOM, { render } from "react-dom" ;
import {Link , withRouter} from "react-router-dom" ;
import axios from "axios" ;
import image from "../../Images/CommonImages/corona.jpg" ;

class Signup extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            name : "" ,
            regNo : "" ,
            batch : "" ,
            branch : "" ,
            mail : "" ,
            contact : 0 ,
            gender : "" ,
            age : 0 ,
            usertype : "" ,
            password : "" ,
            dept : "" ,
            staffId : "" ,
            admin : false ,
            alertmessage : "none" ,
        }
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        console.log(this.state.usertype) ;
        
        const newUser = {
            name : this.state.name ,
            mail : this.state.mail ,
            contact : this.state.contact ,
            gender : this.state.gender ,
            age : this.state.age ,
            password : this.state.password ,
            branch : this.state.branch ,
            usertype : this.state.usertype ,
        }
        let id ;
        if(this.state.usertype === "staff"){
                newUser.dept = this.state.dept ;
                newUser.staffId = this.state.staffId ;
                id = this.state.staffId ;
                newUser.admin = this.state.admin ;
            }
        else{
                newUser.registrationNo = this.state.regNo ;
                id = this.state.regNo ;
                newUser.batch = this.state.batch ;
            }
        console.log("Hello") ;
        console.log(newUser) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/signup/add' ,
            'data' : newUser
        }).then((res) => {
            console.log(res.data) ;
            this.setState({alertmessage : res.data.message}) ;
            console.log(this.state.alertmessage) ;
            if(this.state.alertmessage === "none")
                this.props.history.push("/covidsaver/login") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;

        const newNotification = {
            id : id ,
            body : "Please Take The Assessment First" ,
            toadmin : false ,
        }
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/notification/add' ,
            'data' : newNotification
        }).then((res) => {
            console.log("hello there in assessment Notification frontend.") ;
            console.log(res.data) ;
            //this.props.history.push("/covidsaver/user/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;

    }

    handleChange = (event) => {
        event.target.type === "checkbox"
        ? this.setState({[event.target.name] : event.target.checked})
        : this.setState({[event.target.name] : event.target.value}) ;
        this.setState({alertmessage : "none"})

    }
    // Usertype*, name* , regno*, staffid*, batch*, dept* ,admin*, age* , email*, contact* ,branch* ,gender* , password
    render(){
        return(
                <div className="container-fluid" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh" }}>
                    <div className="row justify-content-center mt-10">
                        <div className="col-md-7 text-light">
                        {
                            this.state.alertmessage !== "none" &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {this.state.alertmessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                            <h4 className="text-center h2">Sign Up</h4>
                            <form onSubmit={this.onSubmit} className=" p-5 h6">
                                {/* user type wale mein radio button lagana hai */}
                                <div className="form-check form-check-inline h6">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="usertype" value="student" />
                                        Student
                                    </label>
                                </div>
                                <div className="form-check form-check-inline h6">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="usertype" value="staff" />
                                        Staff
                                    </label>
                                </div>
                                <div className="form-group h6">
                                    <label>Name :</label>
                                    <input placeholder="Enter Your Name" onChange={this.handleChange} type="text" className="form-control" required name="name" value={this.state.name} />
                                </div>
                                {
                                    this.state.usertype === "student" ?
                                        <div className="form-group h6">
                                            <label>Registration Number :</label>
                                            <input placeholder="Enter Registration Number" onChange={this.handleChange} type="text" className="form-control" required name="regNo" value={this.state.regNo} />
                                        </div>
                                    :
                                        <div className="form-group h6">
                                            <label>Staff Id :</label>
                                            <input placeholder="Enter Staff Id" onChange={this.handleChange} type="text" className="form-control" required name="staffId" value={this.state.staffId} />
                                        </div>
                                }
                                { 
                                    this.state.usertype === "student" ?
                                        <div className="form-group h6">
                                            <label>Batch :</label>
                                            <input placeholder="Enter Batch (For Example 2019-20)" onChange={this.handleChange} type="text" className="form-control" required name="batch" value={this.state.batch} />
                                        </div>
                                    :
                                        <div className="form-group h6">
                                            <label>Department :</label>
                                            <input placeholder="Enter Your Department" onChange={this.handleChange} type="text" className="form-control" required name="dept" value={this.state.dept} />
                                        </div>
                                }
                                { //yahaan par radio wala tag lagana hai
                                    this.state.usertype === "staff"  &&
                                    <div className="form-check h6">
                                    <label>
                                        <input onChange={this.handleChange} type="checkbox" className="form-check-input" name="admin" checked={this.state.admin} />
                                        Admin
                                    </label>
                                </div>
                                }
                                <div className="form-group h6">
                                    <label>Age :</label>
                                    <input placeholder="Enter Your Age" onChange={this.handleChange} type="number" className="form-control" required name="age" value={this.state.age} />
                                </div>
                                <div className="form-group h6">
                                    <label>E-Mail :</label>
                                    <input placeholder="Enter Your NITC Email" onChange={this.handleChange} type="email" className="form-control" required name="mail" value={this.state.mail} />
                                </div>
                                <div className="form-group h6">
                                    <label>Contact Number :</label>
                                    <input maxLength="12" placeholder="Enter Your Contact Number" onChange={this.handleChange} type="text" className="form-control" required name="contact" value={this.state.contact} />
                                </div>
                                <div className="form-group h6">
                                    <label>Branch :</label>
                                    <input placeholder="Enter Your Branch" onChange={this.handleChange} type="text" className="form-control" required name="branch" value={this.state.branch} />
                                </div>
                                {/* gender wale mein bhi radio tag lagana hai */}
                                <div className="form-check form-check-inline h6">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="gender" value="male" />
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline h6">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="gender" value="female" />
                                        Female
                                    </label>
                                </div>
                                <div className="form-group h6">
                                    <label>Password :</label>
                                    <input placeholder="Enter Password" onChange={this.handleChange} type="password" className="form-control" required name="password" value={this.state.password} />
                                </div>
                                <div className="form-group h6">
                                    <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-danger" value="Register" />
                                </div>
                                <div style={{display:"flex" , flexDirection:"column"}}>
                                    <p>Already have an account <a href="/covidsaver/login" style={{color:"red"}}>Login here</a></p>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
        ) ;
    }
}

export default withRouter (Signup) ;