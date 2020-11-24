import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/authentication/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    
    const authContext = useContext(AuthContext);
    const { loading, authenticated, userAuthenticate } = authContext;
    
    useEffect(() => {
        userAuthenticate();
    }, []);

    return ( 
        <Route { ...props } render={  props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
     );
}
 
export default PrivateRoute;

