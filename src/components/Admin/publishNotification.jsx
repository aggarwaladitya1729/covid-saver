import react , {Component, useState} from "react" ;
import ReactDOM, { render } from "react-dom" ;
import {Link} from "react-router-dom" ;
import {withRouter} from "react-router-dom" ;
import axios from "axios" ;
import "../../App.css" ;
import image from "./road.jpg" ;


class PublishNotification extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            toadmin : false ,
            body : "" ,
            id : "" ,
            type : "" ,
        }
        // console.log("withRoute" , this.props) ;
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        //let userId = this.state.userId ;
        //console.log(this.state.userId) ;
        console.log("hello there in admin publish notification frontend onSubmit") ;
        let id = this.state.id ;
        console.log(this.state.type) ;
        if(this.state.type === "toall")
            id = "0" ;
        const newNotification = {
            id : id ,
            body : this.state.body ,
            toadmin : false ,
        }
        console.log(newNotification) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/admin/notification/publish' ,
            'data' : newNotification
        }).then((res) => {
            console.log(res.data) ;
            //this.props.history.push("/covidsaver/admin/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;
        this.props.history.push("/covidsaver/admin/home") ; 
    }

    handleChange = (event) => {
        event.target.type === "checkbox"
        ? this.setState({[event.target.name] : event.target.checked})
        : this.setState({[event.target.name] : event.target.value}) ;
    }

    render(){
        return(
            // <div style={{minHeight : "100vh"}} className="d-flex felx-column bg-dark text-success justify-content-center align-items-center">
            <div className="App-header" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh"}}>
                <form onSubmit={this.onSubmit} className="w-50 text-light">
                <div className="d-flex justify-content-center">
                    <div className="form-check form-check-inline h3">
                        <label>
                            <input onChange={this.handleChange} type="radio" className="form-check-input" name="type" value="toone" />
                            To One
                        </label>
                    </div>
                    <div className="form-check form-check-inline h3">
                        <label>
                            <input onChange={this.handleChange} type="radio" className="form-check-input" name="type" value="toall" />
                            To All
                        </label>
                    </div>
                </div>
                {
                    this.state.type === "toone" && 
                    <div className="form-group h3">
                        <label>Student/Staff Registration Number</label>
                        <input placeholder="Enter User Id(whose assessment form is being filled)" onChange={this.handleChange} type="text" className="form-control" required name="id" value={this.state.id} />
                    </div>
                }
                    <div className="form-group h3">
                        <label>Notification Body</label>
                        <input placeholder="Enter Notification to Send" onChange={this.handleChange} type="text" className="form-control" required name="body" value={this.state.body} />
                    </div>
                    <div className="form-group">
                        <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-info" value="Publish" />
                    </div>     
                </form>
            </div>
        ) ;
    }
}

export default withRouter (PublishNotification) ;