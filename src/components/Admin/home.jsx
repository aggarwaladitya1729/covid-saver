import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import image from "../rock.jpg" ;

class Home extends Component {

    constructor(props){
        super(props) ;
    }
    
    render(){
        return(
            <div className="App-header h2 text-white" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh"}}>
                {/* <p>Together We Can...</p> */}
                <p>Together We Will...</p>
            </div>
        )
    }
}

export default Home ;