import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import notifImage from "./notification.png" ;


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
            <div className="d-flex flex-column align-items-center text-light border-dark text-center h4">
                {
                    this.state.notifications.length === 0 ? <p>Nothing here</p>
                    : this.state.notifications.map((notif) => {
                        return (
                            <div style={{borderBottom : "4px solid white" , borderTop:"4px solid white"}} className="mt-3" key={notif._id} value={notif._id}>{notif.body}</div>
                        ) ;
                    })
                }
            </div>
            </div>
        )
    }
}

export default Notification ;