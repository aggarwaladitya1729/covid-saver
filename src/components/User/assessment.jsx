import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import {withRouter} from "react-router-dom" ;
import plane from "../../Images/UserImages/plane.jpg" ;
import covid from "../../Images/UserImages/covid.png" ;
import dna from "../../Images/UserImages/dna.jpg" ;
import meet from "../../Images/UserImages/meeting.jpg" ;

class Assessment extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            subQuestions : [] ,
            questions : [] ,
            mainQuestions : [] ,
            current : 0 ,
            currentSubQuestion : 0 ,
            isLoading : true ,
            answers : [] ,
            subAnswers : [] ,
            inSubQuestions : false ,
            inMainQuestion : true ,
            val : false ,
            subVal : false ,
            status : "" ,
            images : [] ,
            subCheck : false ,
            check : false ,
            message : "" ,
            next : false ,
            isTrue : false ,
            isNextButtonPressed : false ,
            switchToSubQuestion : false ,
            checkedYes : false ,
        }
    }

    handleChange = (event) => {
        this.setState({check : true , isNextButtonPressed : false}) ;
        if(event.target.type === "checkbox"){
            this.setState({[event.target.name] : event.target.checked}) ;
            console.log(event.target.name , event.target.checked) ;
            event.target.checked = false ;
        }

        if(event.target.value === "yes" && this.state.inMainQuestion === true){
            this.setState({switchToSubQuestion : true , checkedYes : true}) ;
            //if(this.state.inSubQuestions === true){
            let quest = this.state.questions.filter((q) => {
                //console.log(this.state.current  , Math.trunc((q.number)-1) , q.isSubQuestion , q.question) ;
                if((this.state.current == Math.trunc(q.number)-1) && q.isSubQuestion === true){    
                    console.log("hello") ;
                    console.log(q) ;
                    return q ;
                }
            })
            console.log("hello quest " , quest) ;
            this.setState({subQuestions : quest}) ;
            //}
            //console.log(this.state.subQuestions) ;
        }
        else if(event.target.value === "no" && this.state.inSubQuestions === true){
            this.setState({inMainQuestion : false , checkedYes : false}) ;
        }
        else if(event.target.value === "no"){
            this.setState({inSubQuestions : false , switchToSubQuestion : false , checkedYes : false}) ;
        }
    }

    handleSubQuestionNext = (isCritical) => {
        //this.setState({isNextButtonPressed : true}) ;
        if(isCritical === true && this.state.checkedYes === true){
            console.log("inside high risk subquestion" , isCritical) ;
            let finalstatus = "High Risk" ;
            this.setState({status : finalstatus}) ;
        }
        this.setState({inSubQuestions : true , inMainQuestion : false}) ;
        console.log("hello brother") ;
        console.log(this.state.currentSubQuestion) ;
        
        if(this.state.currentSubQuestion != this.state.subQuestions.length-1){
            this.setState({currentSubQuestion : this.state.currentSubQuestion + 1}) ;
        }
        else{
            this.setState({inMainQuestion : true , inSubQuestions : false , switchToSubQuestion : false}) ;
        }
        console.log("In handleSuBQuestionNext") ;
    }

    handleNext = (isCritical) => {

        if(isCritical === true && this.state.checkedYes === true){
            console.log("inside high risk handle next" , isCritical) ;
            let finalstatus = "High Risk" ;
            //this.state.status = "High Risk" ;
            this.setState({status : finalstatus}) ;
            console.log(this.state.status) ;
        }
        if(this.state.switchToSubQuestion === true)
            this.setState({inSubQuestions : true}) ;
        this.setState({isNextButtonPressed : true}) ;

        //this.setState({isYes : false}) ;
        this.setState({next : true , currentSubQuestion : 0}) ;
        if(this.state.check === false){
            this.setState({message : "Please answer the question !"}) ;
        }
        else{
            this.setState({check : true}) ;
            // this.setState(prevState => ({
            //     answers : [...prevState.answers , this.state.val]
            // }))
            if(this.state.current != this.state.mainQuestions.length-1)
                this.setState({current : this.state.current + 1}) ;
            console.log("Before map function")
            
        }
    }

    handleSubQuestionPrevious = () => {
        if(this.state.currentSubQuestion != 0)
            this.setState({currentSubQuestion : this.state.currentSubQuestion - 1}) ;
    }

    handlePrevious = () => {
        if(this.state.current != 0)
            this.setState({current : this.state.current - 1}) ;
    }

    getBody = (status) => {
        let body = "" ;
        if(status.search("Safe") != -1){
            body = "You are SAFE according to the assessment" ;
        }
        else if(status.search("High") != -1){
            //console.log("hello high risk") ;
            body = "You are at high risk and advised to stay at home" ;
        }
        return body ;
    }

    maintainNotification = (newNotification) => {
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/notification/add' ,
            'data' : newNotification
        }).then((res) => {
            console.log("hello there in assessment Notification frontend.") ;
            console.log(res.data) ;
            this.props.history.push("/covidsaver/user/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;
    }

    onSubmitToAdmin = (event) => {
        event.preventDefault() ;
        this.setState(prevState => ({
            answers : [...prevState.answers , this.state.val]
        }))
        let id = this.getId() ;
        let status = this.getStatus() ;
        let body = this.getBody(status) ;
        body = "Response Sent To Admin : " + body ;
        const newNotification = {
            id : id ,
            body : body ,
            toadmin : true ,
            latitude : window.localStorage.getItem("Latitude") ,
            longitude : window.localStorage.getItem("Longitude") ,
        }
        console.log("Hello") ;
        this.maintainHealthRecord() ;
        this.maintainNotification(newNotification) ;
    }

    getId = () => {
        let id ;
        let usertype = window.localStorage.getItem("usertype") ;
        if(usertype === "staff")
            id = window.localStorage.getItem("staffId") ;
        else if(usertype === "student")
            id = window.localStorage.getItem("regNo") ;
        console.log("Id is " , id) ;
        return id ;
    }

    getStatus = () => {
        console.log(this.state.status) ;
        if(this.state.status === "")
            return "Assessment Test Taken Found Safe" ;
        let status = "Assessment Test Taken And Found At High Risk" ;
        return status ;
    }

    maintainHealthRecord = () => {

        let id = this.getId() ;
        let symptoms = [] ;
        let result = false ;
        // let status = false ;
        let dliq = 0 ;
        let status = this.getStatus() ;
        console.log("status is " ,status) ;
        this.setState({status : status}) ;
        let usertype = window.localStorage.getItem("usertype") ;
        const newHealthRecord = {
            userId : id ,
            usertype : usertype ,
            symptoms : symptoms ,
            result : result ,
            status : status ,
            daysLeftInQuarantine : dliq ,
        }
        console.log("Hello") ;
        console.log(newHealthRecord) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/healthrecord/add' ,
            'data' : newHealthRecord
        }).then((res) => {
            console.log("hello there in assessment health record frontend.") ;
            console.log(res.data) ;
            //this.props.history.push("/covidsaver/user/home") ;  
            //window.location("/") ;

        })
        .catch(err => console.log(err)) ;
    }

    onSubmit = (event) => {
        // id , symptoms , result , status , daysLeftInQuarantine
        
        event.preventDefault() ;
        let id = this.getId() ;
        let status = this.getStatus() ;
        let body = this.getBody(status) ;
        this.setState(prevState => ({
            answers : [...prevState.answers , this.state.val]
        }))
        
        const newNotification = {
            id : id ,
            body : body ,
            toadmin : false ,
            latitude : window.localStorage.getItem("Latitude") ,
            longitude : window.localStorage.getItem("Longitude") ,
        }
        
        //let id = this.getId() ;
        this.maintainNotification(newNotification) ;
        console.log(id) ;
        this.maintainHealthRecord() ;
        this.props.history.push("/covidsaver/user/home") ;
    }

    componentDidMount = () => {
        //Get the questions from the database
        var imagesArray = [plane , covid , dna , meet]
        // this.state.images.push({assess}) ;
        // this.state.images.push("./coughing.jpeg") ;
        // this.state.images.push("./heartbeat.jpeg") ;
        // this.state.images.push("./meeting.jpeg") ;
        this.setState({images : imagesArray}) ;
        console.log(this.state.images) ;
        console.log("Hello there in componentDidMount of assessment frontend") ;
        axios({
            'method' : 'GET' ,
            'url' : 'http://localhost:5000/covidsaver/user/assessment/questions'
        }).then((res) => {
            console.log(res.data) ;
            this.setState({questions : res.data.questions.map((question) => {return question ;})}) ;
            this.setState({mainQuestions : res.data.questions.filter((question) => {
                if(question.isSubQuestion === false)
                    return question ;
                })
            }) ;
            this.setState({isLoading : false}) ;
        })
        .catch((err) => {console.log("Error in assessment catch block " + err)}) ;

    }

    render(){
        // style={{backgroundImage : `url(${assessImage})`}}
        return(
            <div className="App-header text-light" style={{textShadow:"4px 2px #000000" ,backgroundImage : `url(${this.state.images[this.state.current]})` , backgroundSize:"cover" , paddingTop:"100px"}}>
                {
                    this.state.isLoading ? <h3>Loading Questions</h3>
                    :<div> 
                        <div className="card-transparent text-center">
                        {/* <img className="card-img-top" src={this.state.images[this.state.current]} alt="Card image cap"></img> */}
                            <div className="card-body h3 ">
                                <h4 className="text-danger h3">{this.state.next === true && this.state.message !== "" && this.state.message}</h4>
                                {   this.state.inSubQuestions === true
                                    ? <h5 className="card-title">Question {this.state.subQuestions[this.state.currentSubQuestion].number}</h5>
                                    : <h5 className="card-title">Question {this.state.mainQuestions[this.state.current].number}</h5>
                                }
                                {this.state.inSubQuestions === true 
                                    ? <p className="card-text">{this.state.subQuestions[this.state.currentSubQuestion].question}.</p>
                                    : <p className="card-text">{this.state.mainQuestions[this.state.current].question}.</p>
                                }
                                <div className="d-flex justify-content-center">
                                    <label className="mr-3">
                                        <input onChange={this.handleChange} type="radio" name="answer" value="yes" />
                                        Yes
                                    </label>
                                
                                
                                    <label>
                                        <input onChange={this.handleChange} type="radio" name="answer" value="no" />
                                        No
                                    </label>
                                </div>
                                <div className="mt-3">
                                {
                                    this.state.inSubQuestions === false
                                    ? <button className="mr-2 btn btn-info" onClick={this.handlePrevious}>Previous</button>
                                    : <button className="mr-2 btn btn-info" onClick={this.handleSubQuestionPrevious}>Previous</button>
                                }
                            
                                {
                                    this.state.current === this.state.mainQuestions.length-1 && this.state.switchToSubQuestion === false
                                    ? <button className="mr-2 btn btn-info" onClick={this.onSubmit}>Submit</button>
                                    : (this.currentSubQuestion === this.state.subQuestions.length - 1 && <button className="mr-2 btn btn-info" onClick={this.onSubmit}>Submit</button>)
                                }
                                {
                                    this.state.inSubQuestions === false
                                    ? <button className="mr-2 btn btn-info" onClick={()=>this.handleNext(this.state.mainQuestions[this.state.current].isCritical)}>Next</button>
                                    : <button className="mr-2 btn btn-info" onClick={()=>this.handleSubQuestionNext(this.state.subQuestions[this.state.currentSubQuestion].isCritical)}>Next</button>
                                }
                                
                                </div>
                                
                                {
                                    this.state.current === this.state.mainQuestions.length-1 && this.state.switchToSubQuestion === false
                                    ? <button className="mr-2 btn btn-info" onClick={this.onSubmitToAdmin}>Submit To Admin</button>
                                    : (this.currentSubQuestion === this.state.subQuestions.length - 1 && <button className="mr-2 btn btn-info" onClick={this.onSubmitToAdmin}>Submit To Admin</button>)
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        ) ;
    }
}

export default  withRouter (Assessment) ;