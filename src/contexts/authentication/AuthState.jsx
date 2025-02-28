import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR, 
    LOG_OUT
} from '../../types';


const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        data_user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Funciones 
    const userRegister = async data => {
        try {
            const request = await axiosClient.post('/api/users', data);
            console.log(request);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: request.data
            });

            userAuthenticate();

        } catch (error) {
            
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };

            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            });
        }
    }

    //retorna usuario autenticado
    const userAuthenticate = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    //Inicio de Sesion
    const loginUser = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            userAuthenticate();

        } catch (error) {
            console.log(error.response.data.msg);

            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const logoutUser = () => {
        dispatch({
            type: LOG_OUT
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                data_user: state.data_user,
                message: state.message,
                loading: state.loading,
                userRegister, 
                loginUser,
                userAuthenticate,
                logoutUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    ) 
}

export default AuthState;