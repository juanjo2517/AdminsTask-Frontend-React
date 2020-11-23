import React , { useReducer } from 'react';
import AlertReducer from './AlertReducer';
import AlertContext from './AlertContext';
import {
    VIEW_ALERT, 
    REMOVE_ALERT
} from '../../types';


const AlertState = props => {
    const initialState = {
        alert: null
    };

    const [ state, dispatch ] = useReducer(AlertReducer, initialState);

    //Funciones 

    const viewAlert = (message, category) => {
        dispatch({
            type: VIEW_ALERT,
            payload: {
                message,
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            });
        }, 4000);
        
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                viewAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;
