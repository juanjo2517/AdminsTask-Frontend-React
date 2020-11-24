import React, { useContext, useEffect } from 'react'
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';
import AuthContext from '../../contexts/authentication/AuthContext';

const Projects = () => {
    //Extraer info autenticacion
    const authContext = useContext(AuthContext);
    const { userAuthenticate } = authContext;

    useEffect(() => {
        userAuthenticate();
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar/>
            
            <div className="seccion-principal">
                <Header/>
                <main>
                    <FormTask/>
                    <div className="contenedor-tareas">
                        <ListTask/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Projects;