import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../contexts/alerts/AlertContext';
import AuthContext from '../../contexts/authentication/AuthContext';

const Login = (props) => {

    //Extraer valores del Context
    const alertContext = useContext(AlertContext);
    const { alert, viewAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, loginUser } = authContext;

    //Usuario y Password no existe
    useEffect(() => {
        if(authenticated){
            props.history.push('/proyectos');
        }

        if(message){
            viewAlert(message.msg, message.category);
        }
    }, [message, authenticated, props.history]);

    //Staste para login
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
            viewAlert('Todos los campos son obligatorios', 'alerta-error');
            return; 
        }

        //Pasar al action
        loginUser({email, password});
    }

    return ( 
        <div className="form-usuario">
            {alert 
            ? 
            (<div className={`alerta ${alert.category}`}>{alert.message}</div>)
             : 
            null}
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