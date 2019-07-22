import React from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import {API_ROOT} from "../constants";
import { setCookie } from "../helpers";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email:"",
            password:"",
            message:""
        }
        this.loginSubmit = this.loginSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;    
        this.setState({
          [name]: value
        })
    }

    loginSubmit(event){        
        event.preventDefault();        
        const loginData = this.state;
        fetch(API_ROOT+"login", {
            method:"post",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify(loginData)
        })
        .then(response=>response.json())
        .then(userData =>{
            if(userData.status === "fail"){
                this.setState({message:userData.status});
            }else{
                this.setState({message:userData.status});                
                setCookie("user-login", userData.userData[0].email, 0.2);                
                this.props.handleLogoutState(false);
            }
        })
    }


    render(){        
        return(
            <div>
                {this.props.registerSuccess && <p className="alert alert-success">{this.props.registerSuccess}</p>}
                {this.state.message ? this.state.message === 'success' ? 
                    <p className="alert alert-success">{'User loggedin successfully'}</p>
                    : <p className="alert alert-danger">{'Username or Password is incorrect'}</p> : ""
                }
            <Form onSubmit={this.loginSubmit}>
                <h2>Login</h2>                    
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                        Email
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="email" required placeholder="Email" name="email"
                         value={this.state.email} onChange={this.handleChange}
                         />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="password" required placeholder="Password" name="password"
                        value={this.state.password} onChange={this.handleChange}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 3, offset: 1 }}>
                        <Button type="submit">Login</Button>
                        </Col>
                        <Col sm={{ span: 1 }}>
                        <Button onClick={this.props.registerBtn}>Register</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }    
}
export default Login;