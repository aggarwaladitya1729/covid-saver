import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import image from "../../Images/UserImages/sea.jpg" ;

class Home extends Component {
    constructor(props){
        super(props) ;
        this.state = {
            status : "At Home" ,
            isLoading : true ,
            date : new Date() ,
        }
    }

    componentDidMount = () => {
        //Get the health record from the database
        const Info = {
            usertype : window.localStorage.getItem("usertype") ,
        }
        if(Info.usertype === "staff")
            Info.id = window.localStorage.getItem("staffId") ;
        else
            Info.id = window.localStorage.getItem("regNo") ;
        console.log("Hello there in componentDidMount of home frontend") ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/healthrecord/receive' ,
            'data' : Info ,
        }).then((res) => {
            console.log(res.data.date) ;
            //this.setState({date : res.data.date}) ;
            this.setState({isLoading : false , date : res.data.date}) ;
            this.setState({status : res.data.status}) ;
        })
        .catch((err) => {console.log("Error in assessment catch block " + err)}) ;

        // setTimeout(() => {
        //     this.setState({isLoading : false}) ;
        // }, 2000);
        //console.log(new Date().getDate()) ;
    }

    render(){
        // style={{backgroundImage : `url(${meeting})`}}>
        return(
            <div className="App-header h2 text-dark" style={{backgroundImage : `url(${image})` , backgroundSize:"cover"}}> 
                <h3 className="h2">Your Status</h3>
                <div className="container w-auto text-center"  style={{border:"3px black solid" , marginBottom:"10px"}}>
                    {
                        this.state.isLoading ? <p>Loading...</p> : this.state.status 
                    }
                </div>
                {   this.state.status.includes("Quarantined") === true &&
                    <div className="container w-auto text-center"  style={{border:"3px black solid" , marginBottom:"120px"}}>
                        <p>{15-(new Date().getDate() - this.state.date)} Days remaining in Quarantine</p>
                    </div>
                }
            </div>
        )
    }
}

export default Home ;