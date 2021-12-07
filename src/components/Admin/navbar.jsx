
import React , { Component } from 'react';
import {BrowserRouter as Router , Route, withRouter} from "react-router-dom" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
import "../../App.css" ;

class AdminNavbar extends Component{
	constructor(props){
		super(props) ;
	}

	onSubmit = (event) => {
		event.preventDefault() ;
		localStorage.clear() ;
		window.location.href = "/covidsaver" ;
	}

	render(){
		// Home ,Assessment , Feedback , Notifications , Guidelines
		return (
            
            	<nav className="navbar navbar-expand-lg navbar-light navAdi" style={{fontWeight:"400"}}>
					<a className="navbar-brand h6" href="/covidsaver/admin/home">CovidSaver</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse h6 nav-font" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link" href="/covidsaver/admin/home">Home</a>
							</li>
							<li className="nav-item nav-hover nav-font" >
								<a className="nav-link" href="/covidsaver/admin/assessment">User Assessment</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link" href="/covidsaver/admin/publishnotification">Publish Notification</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link" href="/covidsaver/admin/viewfeedback">View Feedbacks</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link" href="/covidsaver/admin/publishguidelines">Publish Guidelines</a>
							</li>
                            <li className="nav-item nav-hover nav-font">
								<a className="nav-link" href="/covidsaver/admin/viewnotifications">View Notification</a>
							</li>
						</ul>
						<form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
							<button style={{marginRight:"20px"}} className="btn bg-dark btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
						</form>
					</div>
				</nav>
            
		);
	}
}

export default withRouter (AdminNavbar) ;