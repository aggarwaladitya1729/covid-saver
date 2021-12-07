import react , {Component, useState} from "react" ;
import ReactDOM, { render } from "react-dom" ;
import {Link} from "react-router-dom" ;
import {withRouter} from "react-router-dom" ;
import axios from "axios" ;
import "../../App.css" ;
import feedImage from "./coffee.jpg" ;


class Feedback extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            title : "" ,
            body : "" ,
            userId : "" ,
        }
        // console.log("withRoute" , this.props) ;
    }

    getId = () => {
        let id ;
        let usertype = window.localStorage.getItem("usertype") ;
        if(usertype === "staff")
            id = window.localStorage.getItem("staffId") ;
        else if(usertype === "student")
            id = window.localStorage.getItem("regNo") ;
        console.log("Id is " , id) ;
        return id ;
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        let userId = this.getId() ;
        console.log(this.state.userId) ;
        console.log("hello there in feedback frontend onSubmit") ;
        const feedback = {
            userId : userId ,
            title : this.state.title ,
            body : this.state.body ,
        }
        console.log(feedback) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/feedback/add' ,
            'data' : feedback
        }).then((res) => {
            console.log(res.data) ;
            //this.props.history.push("/covidsaver/user/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;
        this.props.history.push("/covidsaver/user/home") ; 
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value}) ;
    }

    render(){
        return(
            // <div style={{minHeight : "100vh"}} className="d-flex felx-column bg-dark text-success justify-content-center align-items-center">
            <div className="App-header text-dark" style={{backgroundImage : `url(${feedImage})` , backgroundSize:"cover"}}>
                <form onSubmit={this.onSubmit} className="w-50">
                    <div className="form-group">
                        <label>Feedback Title</label>
                        <input placeholder="Enter Feedback Title" onChange={this.handleChange} type="text" className="form-control" required name="title" value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label>Feedback Body</label>
                        <input placeholder="Enter Feedback Body" onChange={this.handleChange} type="text" className="form-control" required name="body" value={this.state.body} />
                    </div>
                    <div className="form-group">
                        <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-info" value="Submit" />
                    </div>     
                </form>
            </div>
        ) ;
    }
}

export default withRouter (Feedback) ;