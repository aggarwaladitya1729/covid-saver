import react , {Component, useState} from "react" ;
import ReactDOM, { render } from "react-dom" ;
import {Link} from "react-router-dom" ;
import {withRouter} from "react-router-dom" ;
import axios from "axios" ;
import image from "../../Images/CommonImages/road.jpg" ;


class Login extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            regNo : "" ,
            usertype : "" ,
            password : "" ,
            staffId : "" ,
            admin : false ,
            alertmessage : "none" ,
        }
        console.log("withRoute" , this.props) ;

    }

    onSubmit = (event) => {
        event.preventDefault() ;

        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                window.localStorage.setItem("Latitude" , position.coords.latitude) ;
                window.localStorage.setItem("Longitude" , position.coords.longitude) ;
              });
        } 
        else {
            console.log("Not Available");
        }


        console.log(this.state.password) ;
        const User = {
            password : this.state.password ,
            usertype : this.state.usertype ,
        }
        if(this.state.usertype === "staff"){
                User.staffId = this.state.staffId ;
                User.admin = this.state.admin ;
            }
        else{
                User.registrationNo = this.state.regNo ;
            }
        //console.log("Hello") ;
        //console.log(User) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/login/validate' ,
            'data' : User
        }).then((res) => {
            //console.log(res.data) ;
            //window.location("/covidsaver") ;
            // console.log("withRoute" , this.props) ;

            this.setState({alertmessage : res.data.message}) ;
            console.log("hello aditya login frontend" ,res.data) ;
            if(res.data.success === true){
                window.localStorage.setItem("usertype" , res.data.usertype) ;
                if(res.data.usertype === "staff"){
                    window.localStorage.setItem("staffId" , res.data.staffId) ;
                    window.localStorage.setItem("isadmin" , res.data.admin) ;
                }
                else if(res.data.usertype === "student"){
                    window.localStorage.setItem("regNo" , res.data.regNo) ;
                    window.localStorage.setItem("isadmin" , false) ;
                }
                if(res.data.admin === true){
                    this.props.history.push("/covidsaver/admin/home") ;
                }
                else{
                    this.props.history.push("/covidsaver/user/home") ;
                }
            }
         })
        .catch(err => console.log(err)) ;
    }

    handleChange = (event) => {
        event.target.type === "checkbox"
        ? this.setState({[event.target.name] : event.target.checked})
        : this.setState({[event.target.name] : event.target.value}) ;
    }
    // Usertype*, name* , regno*, staffid*, batch*, dept* ,admin*, age* , email*, contact* ,branch* ,gender* , password
    render(){
        return(
                <div className="container-fluid" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-7 mt-10">
                        {
                            this.state.alertmessage !== "none" &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {this.state.alertmessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                            <h4 className="text-center text-light h2">Login</h4>
                            <form onSubmit={this.onSubmit} className="p-5 h6">
                                {/* user type wale mein radio button lagana hai */}
                                <div className="form-check-inline">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="usertype" value="student" />
                                        Student
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="usertype" value="staff" />
                                        Staff
                                    </label>
                                </div>
                                {
                                    this.state.usertype === "student" ?
                                        <div className="form-group">
                                            <label>Registration Number :</label>
                                            <input placeholder="Enter Your Registration Id" onChange={this.handleChange} type="text" className="form-control" required name="regNo" value={this.state.regNo} />
                                        </div>
                                    :
                                        <div className="form-group">
                                            <label>Staff Id :</label>
                                            <input placeholder="Enter Your Staff Id" onChange={this.handleChange} type="text" className="form-control" required name="staffId" value={this.state.staffId} />
                                        </div>
                                }
                                { //yahaan par radio wala tag lagana hai
                                    this.state.usertype === "staff"  &&
                                    <div className="form-check">
                                        <label>
                                            <input onChange={this.handleChange} type="checkbox" className="form-check-input" name="admin" checked={this.state.admin} />
                                            Admin
                                        </label>
                                    </div>
                                }
                                <div className="form-group">
                                    <label>Password :</label>
                                    <input placeholder="Enter Your Password" onChange={this.handleChange} type="password" className="form-control" required name="password" value={this.state.password} />
                                </div>
                                <div className="form-group">
                                    <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-primary" value="Login" />
                                </div>
                                <div style={{display:"flex" , flexDirection:"column"}}>
                                    <p>Don't have an account <a href="/covidsaver/signup" style={{color:"red" , textAlign:"center"}}>Signup here</a></p>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
        ) ;
    }
}

export default withRouter (Login) ;