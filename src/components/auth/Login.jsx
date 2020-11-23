import React, { useState, useReducer, useContext } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

    //Staste para login
    const [error, updateError] = useState(false);
    const [dataLogin, saveDataLogin] = useState({
        email:'',
        password:''
    });

    const { email, password } = dataLogin;

    const onChange = e => {
        saveDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        //Validar

        if(email.trim() === '' || password.trim() === ''){
            updateError(true);
            setTimeout(() => {
                updateError(false);
            }, 3500);
            return; 
        }

        //Pasar al action
    }

    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Tu Email"
                        value={email}
                        onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="pass    word">Password</label>
                        <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Tu Password"
                        value={password}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                    
                        <input 
                        type="submit"
                        className="btn btn-primario btn-block" 
                        value="Iniciar Sesion"/>
                    </div>  
                    
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Crear Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;