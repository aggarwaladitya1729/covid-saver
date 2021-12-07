import react , {Component} from "react" ;
import ReactDOM from "react-dom" ;
import {Link} from "react-router-dom" ;
import "../../App.css" ;
import axios from "axios" ;
import image from "../../Images/UserImages/tree.jpg" ;

class EditProfile extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            userData : {} ,
            usertype : "" ,
            id : "" ,
            message : "none" ,
            isLoading : true ,
            name : "" ,
            batch : "" ,
            branch : "" ,
            mail : "" ,
            contact : 0 ,
            gender : "" ,
            age : 0 ,
            dept : "" ,
        }
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        console.log(this.state.usertype) ;
        const updatedUser = {
            id : this.state.id ,
            name : this.state.name ,
            contact : this.state.contact ,
            gender : this.state.gender ,
            age : this.state.age ,
            branch : this.state.branch ,
            usertype : this.state.usertype ,
        }
        this.state.usertype === "staff" ? updatedUser.dept = this.state.dept : updatedUser.batch = this.state.batch ;
        // if(this.state.usertype === "staff"){
        //         updatedUser.dept = this.state.dept ;
        //     }
        // else{
        //         updatedUser.batch = this.state.batch ;
        //     }
        console.log("Hello") ;
        console.log(updatedUser) ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/profile/edit' ,
            'data' : updatedUser
        }).then((res) => {
            console.log(res.data) ;
            this.setState({message : res.data.message}) ;

        })
        .catch(err => console.log(err)) ;
    }

    handleChange = (event) => {
        
        event.target.type === "checkbox"
        ? this.setState({[event.target.name] : event.target.checked})
        : this.setState({[event.target.name] : event.target.value}) ;
        
    }

    componentDidMount = () => {
        //Get the health record from the database
        let usertype = window.localStorage.getItem("usertype") ;
        this.setState({usertype}) ;
        let id ;
        if(usertype === "student")  
            id = window.localStorage.getItem("regNo") ;
        else if(usertype === "staff")
            id = window.localStorage.getItem("staffId") ;
        this.setState({id}) ;
        console.log("Hello there in componentDidMount of edit Profile frontend") ;
        axios({
            'method' : 'POST' ,
            'url' : 'http://localhost:5000/covidsaver/user/profile/get' ,
            'data' : {id , usertype} ,
        }).then((res) => {
            console.log(res.data) ;
            this.setState({name : res.data.userData.name}) ;
            this.setState({userData : res.data.userData}) ;
            this.setState({name : res.data.userData.name , mail : res.data.userData.mail , contact : res.data.userData.contact ,
                gender : res.data.userData.gender , branch : res.data.userData.branch , age : res.data.userData.age})
            if(usertype === "student"){
                this.setState({batch : res.data.userData.batch})
            }
            else if(usertype === "staff"){
                this.setState({dept : res.data.userData.dept})
            }
            console.log(this.state.contact)
            this.setState({isLoading : false}) ;
        })
        .catch((err) => {console.log("Error in edit profile catch block frontend" + err)}) ;

    }

    render(){
        // style={{backgroundImage : `url(${meeting})`}}>
        return(
            <div className="container-fluid" style={{backgroundImage : `url(${image})` , backgroundSize:"cover" , minHeight:"100vh" , paddingTop:"100px"}}>
                <div className="row justify-content-center mt-10">
                    <div className="col-md-7 text-light">
                        <h4 className="text-center h2">Edit Profile</h4>
                        {this.state.isLoading === false &&
                        <form onSubmit={this.onSubmit} className=" p-5 h6">
                            <div className="form-group h6">
                                <label>Name :</label>
                                <input placeholder="Enter Your Name" onChange={this.handleChange} type="text" className="form-control" required name="name" value={this.state.name} />
                            </div>
                            { 
                                this.state.usertype === "student" ?
                                    <div className="form-group h6">
                                        <label>Batch :</label>
                                        <input placeholder="Enter Batch (For Example 2019-20)" onChange={this.handleChange} type="text" className="form-control" required name="batch" value={this.state.batch} />
                                    </div>
                                :
                                    <div className="form-group h6">
                                        <label>Department :</label>
                                        <input placeholder="Enter Your Department" onChange={this.handleChange} type="text" className="form-control" required name="dept" value={this.state.dept} />
                                    </div>
                            }
                            
                            <div className="form-group h6">
                                <label>Age :</label>
                                <input placeholder="Enter Your Age" onChange={this.handleChange} type="number" className="form-control" required name="age" value={this.state.age} />
                            </div>
                            
                            <div className="form-group h6">
                                <label>Contact Number :</label>
                                <input placeholder="Enter Your Contact Number" onChange={this.handleChange} type="text" className="form-control" required name="contact" value={this.state.contact} />
                            </div>
                            <div className="form-group h6">
                                <label>Email Address :</label>
                                <input placeholder="Your Email" onChange={this.handleChange}  type="text" readOnly className="form-control" name="mail" value={this.state.mail} />
                            </div>
                            <div className="form-group h6">
                                <label>Branch :</label>
                                <input placeholder="Enter Your Branch" onChange={this.handleChange} type="text" className="form-control" required name="branch" value={this.state.branch} />
                            </div>
                            {/* gender wale mein bhi radio tag lagana hai */}
                            {/* <div className="form-check form-check-inline h6">
                                Gender
                                <label>
                                    <input onChange={this.handleChange} type="radio" className="form-check-input" name="gender" value="male" />
                                    Male
                                </label>
                            </div>
                            <div className="form-check form-check-inline h6">
                                <label>
                                    <input onChange={this.handleChange} type="radio" className="form-check-input" name="gender" value="female" />
                                    Female
                                </label>
                            </div> */}
                            
                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline h6">
                                            <label>
                                                <input onChange={this.handleChange} type="radio" className="form-check-input" name="gender" value="male" />
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline h6">
                                            <label>
                                                <input onChange={this.handleChange} type="radio" className="form-check-input" name="gender" value="female" />
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group h6">
                                <input onSubmit={this.onSubmit} type="submit" className="form-control btn btn-danger" value="Update" />
                            </div>
                        </form>}
                    </div>
                </div>
            </div>
    ) ;
    }
}

export default EditProfile ;