import { FETCH_USERS_DATA, FETCH_SINGLE_USER_DATA, UPDATE_SINGLE_USER_DATA } from '../Actions/types';

export default function userReducer(state = [], action) {    
  switch (action.type) {    
    case FETCH_USERS_DATA:
    state = {
        ...state,
        data:action.payload
        }
        return state;
    case FETCH_SINGLE_USER_DATA:
    state = {
        ...state,
        userData:action.payload
        }        
        return state;
    case UPDATE_SINGLE_USER_DATA:
        state = {
            ...state,
            userUpdateData:action.payload
            }        
            return state;
    default:
      return state;
  }
  
}