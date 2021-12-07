import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import notifImage from "../../Images/UserImages/notification.png" ;


class Notification extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            notifications : [] ,
            isLoading : true ,
        }
    }

    componentDidMount = () => {
        //Get the Notifications from the database
        let usertype = window.localStorage.getItem("usertype") ;
        let id ;
        if(usertype === "student")  
            id = window.localStorage.getItem("regNo") ;
        else if(usertype === "staff")
            id = window.localStorage.getItem("staffId") ;
        
        console.log("Hello there in componentDidMount of notification frontend") ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/notification/receive' ,
            'data' : {id : id} ,
        }).then((res) => {
            console.log(res.data) ;
            this.setState({notifications : res.data.notifications.map((val , index , notif) => {return notif[notif.length-1-index] ;})}) ;
            this.setState({isLoading : false}) ;
        })
        .catch((err) => {console.log("Error in notification catch block frontend" + err)}) ;

    }

    render(){
        return(
            <div style={{backgroundImage : `url(${notifImage})` , backgroundSize:"cover" , minHeight:"100vh" , paddingTop:"100px"}} >
            <div className="d-flex flex-column text-dark  text-center h4">
                <div style={{marginBottom:"20px"}}>
                    Contacts : 
                </div>
                <div style={{marginBottom:"20px"}}>
                    Kozhikode Medical Hospital : 093xxx40293
                </div>
                <div style={{marginBottom:"20px"}}>
                    NITC Hospital : 8xxx4040432
                </div>
                <div style={{marginBottom:"20px"}}>
                    NITC Covid Help : 83902xxx022
                </div>
            </div>
            </div>
        )
    }
}

export default Notification ;