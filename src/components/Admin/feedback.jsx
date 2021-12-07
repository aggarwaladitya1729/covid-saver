import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import image from "../../Images/AdminImages/feedback3.jpg" ;

class Feedback extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            feedbacks : [] ,
            isLoading : true ,
        }
    }

    componentDidMount = () => {
        //Get the feedbacks from the database
        console.log("Hello there in componentDidMount of get feedback admin frontend") ;
        axios({
            'method' : 'GET' ,
            'url' : 'http://localhost:5000/covidsaver/admin/feedback/receive'
        }).then((res) => {
            console.log(res.data) ;
            this.setState({feedbacks : res.data.feedbacks.map((val , index , feed) => {return feed[feed.length-1-index] ;})}) ;
            this.setState({isLoading : false}) ;
        })
        .catch((err) => {console.log("Error in get feedback admin catch block frontend" + err)}) ;

    }

    render(){
        return(
            <div style={{backgroundImage : `url(${image})` , backgroundSize:"fit" , height:"1000px" , minHeight:"100vh" , paddingTop:"100px"}}>
                <div className="d-flex flex-column align-items-center text-white border-dark text-center ">
                    {
                        this.state.feedbacks.length === 0 ? <p>No Feedbacks Currently</p>
                        : this.state.feedbacks.map((feed) => {
                            return (
                                <div style={{borderBottom:"5px solid white"}} key={feed._id} value={feed._id}>
                                    {/* <p className="mb-2 h4">From User Id : {feed.userId.toUpperCase()}</p> */}
                                    <p className="mb-2 h2">{feed.title.toUpperCase()} ({feed.userId.toUpperCase()})</p>
                                    <p className="mb-2 h3">{feed.body}</p>
                                </div>
                            ) ;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Feedback ;