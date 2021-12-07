import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import image from "../../Images/CommonImages/doctor.jpg" ;

function landingPage() {

    const login = () => {
        window.location = "/covidsaver/login" ;
    }
    const signup = () => {
        window.location = "/covidsaver/signup" ;
    }
    return(
        <div className="App-header text-center" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh" }}>
            <h2 className="text-light" style={{fontSize:"30px"}}>
                Welcome To Covid Saver App
            </h2>
            <div className="mt-4">
                <button className="mr-2 btn btn-primary btn-lg" onClick={login} >Login</button>
                <button className="mr-2 btn btn-danger btn-lg" onClick={signup} >Signup</button>
            </div>
        </div>
    )
}

export default landingPage ;