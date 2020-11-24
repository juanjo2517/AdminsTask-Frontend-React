import React, { useContext, useEffect } from 'react'
import Project from './Project';
import ProjectContext from '../../contexts/projects/ProjectContext';
import AlertContext from '../../contexts/alerts/AlertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListProjects = () => {

    //Extraer proyectos del state inicial
    const projectsContext = useContext(ProjectContext); 
    const { message, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, viewAlert } = alertContext;
    
    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        //Si hay un error
        if(message){
            viewAlert(message.msg, message.category);
            
        }
        getProjects();
    }, [message]);
    
    //Verificar si hay proyectos
    if(projects.length === 0) return <p>No tienes proyectos</p>;
    

    return ( 
        <ul className="listado-proyectos">
            {alert 
            ?  (<div className={`alerta ${alert.category}`}>{alert.msg}</div>)
            : null}
                <TransitionGroup>
                {projects.map( project => (
                    <CSSTransition
                        key={project._id}
                        timeout={400}
                        classNames='tarea'
                    >
                        <Project 
                            project={project}
                        />
                    </CSSTransition>
                ))}
                </TransitionGroup>
            
        </ul>
     );
}
 
export default ListProjects;