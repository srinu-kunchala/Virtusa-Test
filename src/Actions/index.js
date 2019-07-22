import { FETCH_USERS_DATA, FETCH_SINGLE_USER_DATA, UPDATE_SINGLE_USER_DATA } from './types';
import {API_ROOT} from "../constants";

export const fetchData = (data) => {
  return {
    type: FETCH_USERS_DATA,
    payload:data
  }
};
export const singleUserData = (userData) => {
  return {
    type: FETCH_SINGLE_USER_DATA,
    payload:userData
  }
};
export const updateUserData = (userUpdateData) => {
  return {
    type: UPDATE_SINGLE_USER_DATA,
    payload:userUpdateData
  }
};
export const fetchUsersData = () => {  
  return (dispatch) => {
    return fetch(API_ROOT+"get-users")
      .then(response =>response.json())
      .then(response => {          
        dispatch(fetchData(response.users))
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const fetchSingleUserData = (email) => {   
  return (dispatch) => {
    return fetch(API_ROOT+"get-user",{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(email)
      })
      .then(response =>response.json())
      .then(response => { 
        dispatch(singleUserData(response.user))
      })
      .catch(error => {
        throw(error);
      });
  };
};
export const updateSingleUserData = (userUpdate) => {   
  return (dispatch) => {
    return fetch(API_ROOT+"edit-user",{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(userUpdate)
      })
      .then(response =>response.json())
      .then(response => {        
        dispatch(updateUserData(response.user))
      })
      .catch(error => {
        throw(error);
      });
  };
};