import React , { Component } from 'react';
import {BrowserRouter as Router , Route} from "react-router-dom" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
import Navbar from "./navbar" ;

class User extends Component{
	constructor(props){
		super(props) ;
	}
	render(){
		return (
            <div>
				<Navbar/>
            </div>
		);
	}
}

export default User ;