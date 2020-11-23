import React from 'react'
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';


const Projects = () => {
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