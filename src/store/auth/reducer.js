import Cookies from 'js-cookie';
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SIDEBAR_TOGGLE,
  LOADING,
  UPDATE_TOKEN
} from "./actionTypes";


const initialState = {
  is_logged: false,
  login_name:  null,
  login_data:  null,
  login_type:  null,
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case AUTH_SUCCESS:
     
      return {
        ...state,
        ...action.updates,
      };
    case AUTH_LOGOUT:
      return {
        ...initialState,
        login_name: null,
        login_data: null,
        login_type: null,
        is_logged: false,
      };
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        ...action.updates,
      };
    case LOADING:
      return {
        ...state,
        ...action.updates,
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        ...action.updates,
      };
    default:
      return state;
  }
};

export default authReducer;
