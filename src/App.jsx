import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import {BrowserRouter as Router , Route , Redirect} from "react-router-dom" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
//import {withRouter} from "react-router-dom" ;

// Components common to both user and admin
import LandingPage from "./components/Common/landingPage" ;
import Signup from "./components/Common/signup" ;
import Login from "./components/Common/login" ;

// User Component
import User from "./components/User/user" ;
import Home from "./components/User/home" ;
import Assessment from "./components/User/assessment" ;
import Notification from "./components/User/notification" ;
import Feedback from "./components/User/feedback" ;
import Guideline from "./components/User/guideline" ;
import EditProfile from "./components/User/editProfile" ;
import Help from "./components/User/help" ;

// Admin components
import Admin from "./components/Admin/admin" ;
import AdminHome from "./components/Admin/home" ;
import PublishNotification from "./components/Admin/publishNotification" ;
import ViewFeedback from "./components/Admin/feedback" ;
import ViewNotification from "./components/Admin/viewNotification" ;
import PublishGuideline from "./components/Admin/publishGuideline" ;
import AdminAssessment from "./components/Admin/assessment" ;
//import Navbar from "./components/navbar" ;

class App extends Component{
	constructor(props){
		super(props) ;
	}
	render(){
		return (
			<Router>
				{/* {
					this.props.location.path === "/covidsaver" || this.props.location.path === "/covidsaver/signup" || this.props.location.path === "/covidsaver/login"
					? null :<Route exact path="/covidsaver/login/user"> <Navbar/> </Route>
				} */}
				<Route exact path="/covidsaver"> <LandingPage/> </Route>
				<Route exact path="/covidsaver/signup"> <Signup/> </Route>
				<Route exact path="/covidsaver/login"> <Login/> </Route>
				<Route path="/covidsaver/user"> <User/> </Route>
				<Route exact path="/covidsaver/user/home"> <Home/> </Route>
				<Route exact path="/covidsaver/user/assessment"> <Assessment/> </Route>
				<Route exact path="/covidsaver/user/notification"> <Notification/> </Route>
				<Route exact path="/covidsaver/user/feedback"> <Feedback/> </Route>
				<Route exact path="/covidsaver/user/guidelines"> <Guideline/> </Route>
				<Route exact path="/covidsaver/user/profile/edit"> <EditProfile/> </Route>
				<Route exact path="/covidsaver/user/help"> <Help/> </Route>


				<Route path="/covidsaver/admin"> <Admin/> </Route>
				<Route path="/covidsaver/admin/home"> <AdminHome/> </Route>
				<Route exact path="/covidsaver/admin/publishnotification"> <PublishNotification/> </Route>
				<Route exact path="/covidsaver/admin/viewfeedback"> <ViewFeedback/> </Route>
				<Route exact path="/covidsaver/admin/viewnotifications"> <ViewNotification/> </Route>
				<Route exact path="/covidsaver/admin/publishguidelines"> <PublishGuideline/> </Route>
				<Route exact path="/covidsaver/admin/assessment"> <AdminAssessment/> </Route>

				<Route exact path="/"> <Redirect to="/covidsaver" /> </Route>

			</Router>
		);
	}
}

export default (App) ;
