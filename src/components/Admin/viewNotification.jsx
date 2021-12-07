import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import image from "../../Images/AdminImages/technology.jpg" ;

class ViewNotification extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            notifications : [] ,
            isLoading : true ,
        }
    }

    componentDidMount = () => {
        //Get the notifications from the database
        console.log("Hello there in componentDidMount of get notification for admin frontend") ;
        axios({
            'method' : 'GET' ,
            'url' : 'http://localhost:5000/covidsaver/admin/notification/receive'
        }).then((res) => {
            console.log(res.data) ;
            this.setState({notifications : res.data.notifications.map((val , index , notif) => {return notif[notif.length-1-index] ;})}) ;
            this.setState({isLoading : false}) ;
        })
        .catch((err) => {console.log("Error in get view notification admin catch block frontend" + err)}) ;

    }

    render(){
        return(
            <div style={{backgroundImage : `url(${image})`, overflow:"hidden" , backgroundSize:"cover" , minHeight:"100vh" , paddingTop:"100px"}}>
                 <div style={{overflowY : "scroll" , maxHeight:"600px" , height:"100%"}} className="d-flex flex-column align-items-center text-white border-light text-center ">
                {
                    this.state.notifications.length === 0 ? <p>No Notification Currently</p>
                    : this.state.notifications.map((notif) => {
                        return (
                            // <p className="mb-4" key={notif._id} value={notif._id}>{notif.body}</p>
                            <div style={{borderBottom:"5px solid white"}} key={notif._id} value={notif._id}>
                                <p className="mb-2 h3">Message to User : {notif.id.toUpperCase()}</p>
                                {/* <p>Message to the above registered user</p> */}
                                <p className="mb-2 h4">{notif.body.substring(24)}</p>
                                {
                                    notif.latitude === null 
                                    ? <p className="mb-2 h5 text-info">The User did not provide Location Access</p>
                                    : <p className="mb-2 h5 text-info">The Co-ordinates of the user are : {notif.latitude} {notif.longitude }</p>
                                }
                            </div>
                        ) ;
                    })
                }
            </div>
            </div>
        )
    }
}

export default ViewNotification ;