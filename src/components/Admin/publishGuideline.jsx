import react , {Component, useState} from "react" ;
import ReactDOM, { render } from "react-dom" ;
import {Link} from "react-router-dom" ;
import {withRouter} from "react-router-dom" ;
import axios from "axios" ;
import "../../App.css" ;
import image from "./puzzle.jpg" ;


class PublishGuideline extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            number : 6 ,
            guideline : "" ,
        }
        // console.log("withRoute" , this.props) ;
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        //let userId = this.state.userId ;
        //console.log(this.state.userId) ;
        console.log("hello there in admin publish notification frontend onSubmit") ;
        const newGuideline = {
            number : this.state.number ,
            guideline : this.state.guideline ,
        }
        console.log(newGuideline) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/admin/guideline/publish' ,
            'data' : newGuideline ,
        }).then((res) => {
            console.log(res.data) ;
            //this.props.history.push("/covidsaver/admin/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;
        this.props.history.push("/covidsaver/admin/home") ; 
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value}) ;
    }

    render(){
        return(
            // <div style={{minHeight : "100vh"}} className="d-flex felx-column bg-dark text-success justify-content-center align-items-center">
            <div className="App-header" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh"}}>
                <form onSubmit={this.onSubmit} className="w-50">
                    <div className="form-group text-center h2" style={{color:"#0033cc"}}>
                        <label>New Guideline</label>
                        <input onChange={this.handleChange} type="text" className="form-control" placeholder="Enter New Guideline" required name="guideline" value={this.state.guideline} />
                    </div>
                    <div className="form-group">
                        <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-primary" value="Publish" />
                    </div>     
                </form>
            </div>
        ) ;
    }
}

export default withRouter (PublishGuideline) ;