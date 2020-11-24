import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR, 
    LOG_OUT
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case LOG_OUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                data_user: null,
                authenticated: false,
                message: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                data_user: action.payload
            }
        
        default:
            return state;
    }
}