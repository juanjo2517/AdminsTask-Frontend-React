import React, { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/authentication/AuthContext';

const Header = () => {

    const authContext = useContext(AuthContext);
    const { loading, data_user, userAuthenticate, logoutUser } = authContext;

    useEffect(() => {
        userAuthenticate();
    }, []);

    return ( 
        <div className="app-header">
            { data_user && !loading
            ? <p className="nombre-usuario">Hola <span>{data_user.name}</span></p>
            : null }
            
            <nav className="nav-principal">
                <button
                    className="btn btn-block cerrar-sesion"
                    onClick={() => logoutUser()}
                >Cerrar Sesion</button>
            </nav>
        </div>
     );
}
 
export default Header;