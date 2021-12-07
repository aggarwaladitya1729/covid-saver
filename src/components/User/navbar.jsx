
import React , { Component } from 'react';
import {BrowserRouter as Router , Route, withRouter} from "react-router-dom" ;
import "bootstrap/dist/css/bootstrap.min.css" ;

class Navbar extends Component{
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
            <div>
            	<nav className="navbar navbar-expand-lg navbar-light navAdi">
					<a className="navbar-brand h6" href="/covidsaver/user/home">CovidSaver</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse h6" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/home">Home</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/assessment">Assessment</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/notification">Notification</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/feedback">Feedback</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/guidelines">Guidelines</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/profile/edit">Edit Profile</a>
							</li>
							<li className="nav-item nav-hover nav-font">
								<a className="nav-link text-dark" href="/covidsaver/user/help">Help</a>
							</li>
						</ul>
						<form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
							<button style={{marginRight:"20px"}} className="btn bg-dark btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
						</form>
					</div>
				</nav>
            </div>
		);
	}
}

export default withRouter (Navbar) ;