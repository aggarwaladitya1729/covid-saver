import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import image from "../../Images/UserImages/mask.jpg" ;

class Guideline extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            guidelines : [] ,
            isLoading : true ,
        }
    }

    componentDidMount = () => {
        //Get the Guidelines from the database
        console.log("Hello there in componentDidMount of guideline frontend") ;
        axios({
            'method' : 'GET' ,
            'url' : 'http://localhost:5000/covidsaver/user/guideline/receive'
        }).then((res) => {
            console.log(res.data) ;
            this.setState({guidelines : res.data.guidelines.map((guide) => {return guide ;})}) ;
            this.setState({isLoading : false}) ;
        })
        .catch((err) => {console.log("Error in guideline catch block frontend" + err)}) ;

    }

    render(){
        return(
            <div style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh" , paddingTop:"100px"}} >
            <div className="d-flex flex-column align-items-center text-dark h4 border-light text-center">
                <a href="https://health.kerala.gov.in/guidelines.html" target="_blank">Kerala Government Covid Guidelines</a>
                {
                    this.state.guidelines.length === 0 ? <p>Nothing here</p>
                    : this.state.guidelines.map((guide) => {
                        return (
                            <p style={{borderBottom : "4px solid white" , borderTop:"4px solid white"}} className="mt-3" key={guide._id} value={guide._id}>{guide.guideline}</p>
                        ) ;
                    })
                }
            </div>
            </div>
        )
    }
}

export default Guideline ;