import React, { useContext, useEffect } from 'react'
import Project from './Project';
import ProjectContext from '../../contexts/projects/ProjectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListProjects = () => {

    //Extraer proyectos del state inicial
    const projectsContext = useContext(ProjectContext); 
    const { projects, getProjects } = projectsContext;
    
    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        getProjects();
    }, []);

    //Verificar si hay proyectos
    if(projects.length === 0) return <p>No tienes proyectos</p>;


    return ( 
        <ul className="listado-proyectos">
            {
                <TransitionGroup>
                {projects.map( project => (
                    <CSSTransition
                        key={project.id}
                        timeout={400}
                        classNames='tarea'
                    >
                        <Project 
                            project={project}
                        />
                    </CSSTransition>
                ))}
                </TransitionGroup>
            }
        </ul>
     );
}
 
export default ListProjects;