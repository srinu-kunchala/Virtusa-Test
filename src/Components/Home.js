import React from "react";
import Login from "./Login";
import Register from "./Registration";
import Users from "./User";
import { getCookie, deleteCookie } from "../helpers";
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { fetchSingleUserData } from '../Actions/index';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isRegisterBtnClicked:false,
            isCancelBtnClicked:false,
            isLogoutBtnClicked:false,
            message:"",
            singleUserUpdateStatus:false
        }
        this.registerBtnClicked = this.registerBtnClicked.bind(this);
        this.cancelBtnClicked = this.cancelBtnClicked.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutBtnState = this.handleLogoutBtnState.bind(this);
        this.handleRegisterBtnState = this.handleRegisterBtnState.bind(this);
        this.singleUserUpdate = this.singleUserUpdate.bind(this);
    }
    registerBtnClicked(){
        this.setState({isRegisterBtnClicked:true, isCancelBtnClicked:false});
    }
    cancelBtnClicked(){
        this.setState({isCancelBtnClicked:true, isRegisterBtnClicked:false});
    }
    logout(){
        deleteCookie("user-login");
        this.setState({isLogoutBtnClicked:true});
    }
    handleLogoutBtnState(stateValue){
        this.setState({isLogoutBtnClicked:stateValue});
    }
    handleRegisterBtnState(stateValue, registerSuccessMsg){        
        this.setState({isRegisterBtnClicked:stateValue, isCancelBtnClicked:false, message:registerSuccessMsg});
    }
    singleUserUpdate(stateValue){        
        this.setState({singleUserUpdateStatus:stateValue});
    }
    componentDidMount(){
        let cookie = getCookie('user-login');  
        if(cookie){        
            this.props.getUser({email:cookie});
        }
    }
    
    render(){ 
        let cookie = getCookie('user-login');
        return (
            <div className="container">
                <h1>Landing Page</h1>
                <div style={{float:'right'}}>
                { cookie && this.props.userData.data.userData &&  <b>Welcome {this.props.userData.data.userData[0].name}&nbsp;</b>}
                {cookie && <Button onClick={this.logout}>Logout</Button> }
                </div>
                {!cookie || this.state.isLogoutBtnClicked ? 
                    !this.state.isRegisterBtnClicked || this.state.isCancelBtnClicked ? 
                    <Login 
                        registerBtn={this.registerBtnClicked} 
                        handleLogoutState={this.handleLogoutBtnState} 
                        registerSuccess={this.state.message}
                    /> : 
                    <Register 
                        cancelBtn={this.cancelBtnClicked} 
                        handleRegistrationState={this.handleRegisterBtnState}
                    /> : 
                    <Users userComponentStatusUpdate={this.singleUserUpdate}/>}
            </div>
        );
    }
}

const mapStateToProps = state => {    
    return {
      userData:state
    };
  };
const mapDispatchToProps = dispatch => { 
    return {
      getUser: data => {
        dispatch(fetchSingleUserData(data));
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);