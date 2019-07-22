import React from "react";
import {getCookie, deleteCookie} from "../helpers";
import {API_ROOT} from "../constants";
import { Table, Button, Col, Row, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchUsersData, fetchSingleUserData, updateSingleUserData } from '../Actions/index';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            message : "",
            editUser : false,
            viewUser : false,
            username : "",
            id : ""            
        }
        this.editUser = this.editUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.editUserCancel = this.editUserCanel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.editUserDetails = this.editUserDetails.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount(){        
        let cookie = getCookie('user-login');
        if(cookie){
            this.props.getUsersList();
            this.props.getUser({
                email:cookie
            });
        }                
    }
    viewUser(id){
      this.setState({viewUser:true, id:id});
    }
    editUser(){
        this.setState({editUser:true, viewUser:false, username:this.props.userData.data.userData[0].name, id:this.props.userData.data.userData[0].id});
    }
    editUserCanel(){
        this.setState({editUser:false});
    }
    handleEdit(event) {
        const name = event.target.name;
        const value = event.target.value;    
        this.setState({
          [name]: value
        })
      }
    editUserDetails(event){
      event.preventDefault();                  
        this.props.updateUserData({
            id:this.state.id,
            name:this.state.username
        })        
    }
    deleteUser(id) {
      console.log(id);
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {}
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });     
        fetch(API_ROOT+"delete-user", {
            method:"DELETE",
            headers:{
                'content-type':"application/json"
              },
            body:JSON.stringify({id})
        })
          .then(response => response.json())
          .then(result => {              
              this.setState({message:"User deleted successfully"});
              deleteCookie('user-login');
              window.location="/";
            },
            (error) => {
              this.setState({ message:error });
            }
          )
      }
    componentWillReceiveProps(props){
      this.props.userComponentStatusUpdate(true);
      this.setState({editUser:false});
    }

    render(){
        let usersList = this.props.data.data; 
        
        return (
            <div>
                <h1>User Details</h1>
                {this.state.message !== ""  && <p className="alert alert-danger">{this.state.message}</p> }
                <Row>
                {usersList && 
                <Col md={8}>               
                <Table>
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>User Name</th>
                    <th>Email</th>                    
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {usersList.map(user => (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>                    
                    <td>
                        <Button variant="info" onClick={() => this.viewUser(user.id)}>View</Button>&nbsp; 
                        {this.props.userData.data.userData && this.props.userData.data.userData[0].id === user.id && 
                        <span>                       
                        <Button variant="info" onClick={() => this.editUser(user.id)}>Edit</Button>&nbsp;
                        <Button variant="danger" onClick={() => this.deleteUser(user.id)}>Delete</Button>
                        </span>
                        }
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Col>
            }
            <Col md={4}>
                {
                    this.state.editUser && 
                    <Form onSubmit={this.editUserDetails}>                      
                        <h3>Edit Userdata</h3>
                    <Form.Group as={Row} controlId="formHorizontalUserName">
                        <Form.Label column sm={2}>
                        Username
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="text" placeholder="Username" name="username" 
                        value={this.state.username} onChange={this.handleEdit}
                        />
                        </Col>
                    </Form.Group>                                       
                    <Form.Group as={Row}>
                      <Form.Control type="hidden" name="id" value={this.state.id} />
                        <Col sm={{ span: 2, offset: 2 }}>
                        <Button type="submit">Update</Button>
                        </Col>
                        <Col sm={{ span: 2, offset: 2 }}>
                        <Button onClick={this.editUserCancel}>Cancel</Button>
                        </Col>
                    </Form.Group>
                    </Form>
                }
                {
                  this.state.viewUser && 
                  
                  
                  usersList.map(user => (
                    user.id === this.state.id &&
                    <div>
                      <h3>User Details</h3>
                    <p><b>Username:</b>{user.name}</p>
                    <p><b>Email:</b>{user.email}</p>
                    </div>
                  ))
                  
                }
            </Col>
            </Row>
            </div>
        );
    }
}
const mapStateToProps = state => {    
    return {
      data: state.data,
      userData:state,
      editUserData:state
    };
  };
const mapDispatchToProps = dispatch => { 
    return {
      getUsersList: data => {
        dispatch(fetchUsersData(data));
      },
      getUser: data => {
        dispatch(fetchSingleUserData(data));
      },
      updateUserData: data => {
        dispatch(updateSingleUserData(data));
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(User);