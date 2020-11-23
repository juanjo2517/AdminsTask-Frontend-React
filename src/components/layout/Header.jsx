import React from 'react'

const Header = () => {
    return ( 
        <div className="app-header">
            <p className="nombre-usuario">Hola <span>Juan Jose</span></p>
            <nav className="nav-principal">
                <a href="#!">Cerrar Sesion</a>
            </nav>
        </div>
     );
}
 
export default Header;