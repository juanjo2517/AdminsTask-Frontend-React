import React, { useState, useReducer, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../contexts/alerts/AlertContext';
import AuthContext from '../../contexts/authentication/AuthContext';

const NewAccount = (props) => {  

    //Extraer valores del Context
    const alertContext = useContext(AlertContext);
    const { alert, viewAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, userRegister } = authContext;

    //En caso de que usuario se haya autenticado, registro duplicado
    useEffect(() => {
        if(authenticated){
            props.history.push('/proyectos');
        }

        if(message){
            viewAlert(message.msg, message.category);
        }
    }, [message, authenticated, props.history]);

    //Staste para Crear Cuenta
    const [dataNewAccount, saveDataNewAccount] = useState({
        name: '',
        email:'',
        password:'',
        password2:''
    });

    const { name, email, password, password2 } = dataNewAccount;

    const onChange = e => {
        saveDataNewAccount({
            ...dataNewAccount,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        //Validar
        if(email.trim() === '' || password.trim() === '' || name.trim() === ''
         || password.trim() === '' || password2.trim() === ''){
          viewAlert('Todos los campos obligatorios', 'alerta-error');
          return;
        }

        //Validar password
        if(password.length < 8){
            viewAlert('La contraseña debe tener como mínimo 8 caracteres', 'alerta-error');
            return;
        }

        if(password.trim() !== password2.trim()){
            viewAlert('Las contraseñas no coinciden', 'alerta-error');
        }

        //Pasar datos al action 
        userRegister({
            name,
            email,
            password
        }); 

        
    }

    return ( 
        <div className="form-usuario">
            {alert 
            ? 
            (<div className={`alerta ${alert.category}`}>{alert.message}</div>)
             : 
             null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input 
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Tu Nombre"
                        value={name}
                        onChange={onChange}/>
                    </div>

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
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Tu Password"
                        value={password}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password2">Repetir Password</label>
                        <input 
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Repetir Password"
                        value={password2}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                    
                        <input 
                        type="submit"
                        className="btn btn-primario btn-block" 
                        value="Crear Cuenta"/>
                    </div>  
                    
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default NewAccount;