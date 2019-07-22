import React from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import {API_ROOT} from "../constants";
class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            email : "",
            password : "",
            isSubmitted: false,
            message:""
        }        
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        })
      }
    submitRegisterForm(event){
        event.preventDefault();        
        const final_data = this.state;
        fetch(API_ROOT+"add-user", {
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify(final_data)
        })
        .then(response=>response.json())
        .then(responeData=>{            
            if(responeData.status !== 'user_created'){
                this.setState({isSubmitted: false, message:responeData.status});
            }else{
                this.setState({isSubmitted: true});
                this.props.handleRegistrationState(false, "Registration Successfull, Please login");
            }
            
        },(error) => {
            throw error;
          });
    }
   render(){
        return( 
            <div>
                { this.state.message !== '' && <p className="alert alert-danger">{this.state.message}</p> }                   
                <Form onSubmit={this.submitRegisterForm}>                
                <h2>Registration</h2>
                    <Form.Group as={Row} controlId="formHorizontalUserName">
                        <Form.Label column sm={2}>
                        Username
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control required type="text" placeholder="Username" name="username" 
                        value={this.state.username} onChange={this.handleChange}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                        Email
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control required type="email" placeholder="Email" name="email"
                        value={this.state.email} onChange={this.handleChange}
                        />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control required type="password" name="password" placeholder="Password" 
                        value={this.state.password} onChange={this.handleChange}
                         />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={{ span: 2, offset: 2 }}>
                        <Button type="submit">Register</Button>
                        </Col>
                        <Col sm={{ span: 2, offset: 2 }}>
                        <Button onClick={this.props.cancelBtn}>Cancel</Button>
                        </Col>
                    </Form.Group>
                    
                </Form> 
            </div>
        );
    }
    
}
export default Registration;