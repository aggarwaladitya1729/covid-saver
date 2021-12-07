import React , { Component } from 'react';
import {BrowserRouter as Router , Route} from "react-router-dom" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
import AdminNavbar from "./navbar" ;

class Admin extends Component{
	constructor(props){
		super(props) ;
	}
	render(){
		return (
            	<AdminNavbar/>
		);
	}
}

export default Admin ;