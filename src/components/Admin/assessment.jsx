import react , {Component, useState} from "react" ;
import ReactDOM, { render } from "react-dom" ;
import {Link , withRouter} from "react-router-dom" ;
import axios from "axios" ;
import image from "./home.jpg" ;

class Signup extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            userId : "" ,
            symptoms : [] ,
            result : false ,
            status : "" ,
            usertype : "admin" ,
            dliq : 0 ,
            cold : "" ,
            fever : "" ,
            breathing : "" ,
        }
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        //console.log(this.state.usertype) ;
        //console.log("updated health record") ;
        const updatedHealthRecord = {
            userId : this.state.userId ,
            symptoms : this.state.symptoms ,
            result : this.state.result ,
            status : this.state.status ,
            usertype : this.state.usertype ,
            daysLeftInQuarantine : this.state.dliq ,
        }
        console.log("Hello there in admin assessment frontend") ;
        console.log(updatedHealthRecord) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/healthrecord/add' ,
            'data' : updatedHealthRecord ,
        }).then((res) => {
            console.log(res.data) ;
            this.props.history.push("/covidsaver/admin/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;
        //this.props.history.push("/covidsaver/admin/home") ;  
    }

    updateSymptoms = (val , event) => {
        if(event.target.checked === true)
            this.state.symptoms.push(val) ;
        else
            this.state.symptoms.splice(this.state.symptoms.indexOf(val) , 1) ;
    }

    handleChange = (event) => {
        event.target.type === "checkbox"
        ? this.setState({[event.target.name] : event.target.checked})
        : this.setState({[event.target.name] : event.target.value}) ;

        if(event.target.value === "cold")
            this.updateSymptoms("cold" , event) ;
        if(event.target.value === "fever")
            this.updateSymptoms("fever" , event) ;
        if(event.target.value === "breathing")
            this.updateSymptoms("breathing" , event) ;

        //console.log(event.target.name , event.target.checked) ;
    }
    // Usertype*, name* , regno*, staffid*, batch*, dept* ,admin*, age* , email*, contact* ,branch* ,gender* , password
    render(){
        return(
            <div style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh" , paddingTop:"100px"}}>
                <div className="container" >
                    <div className="row justify-content-center">
                        <div className="col-md-7 text-white">
                            <h4 className="text-center">Assessment Form</h4>
                            <form onSubmit={this.onSubmit} className="p-5">
                                {/* user type wale mein radio button lagana hai */}
                                <div className="form-group">
                                    <label>Registration Number :</label>
                                    <input placeholder="Enter User Registratin Number" onChange={this.handleChange} type="text" className="form-control" required name="userId" value={this.state.userId} />
                                </div>
                                <div className="form-check">
                                    <label>
                                        <input onChange={this.handleChange} type="checkbox" className="form-check-input" name="symptom" value="cold" />
                                        Cold
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                        <input onChange={this.handleChange} type="checkbox" className="form-check-input" name="symptom" value="fever" />
                                        Fever
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                        <input onChange={this.handleChange} type="checkbox" className="form-check-input" name="symptom" value="breathing" />
                                        Breathing Issues
                                    </label>
                                </div>
                                <p>Result</p>
                                <div className="form-check">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="result" value="positive" />
                                        Covid Positive
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label>
                                        <input onChange={this.handleChange} type="radio" className="form-check-input" name="result" value="negative" />
                                        Covid Negative
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Status :</label>
                                    <input placeholder="Enter User Status(It will be shown on user's home screen)" onChange={this.handleChange} type="text" className="form-control" required name="status" value={this.state.status} />
                                </div>
                                <div className="form-group">
                                    <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-info" value="Submit Assessment" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    }
}

export default withRouter (Signup) ;