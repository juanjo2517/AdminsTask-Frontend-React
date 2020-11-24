import React, {Fragment, useContext} from 'react'
import ProjectContext from '../../contexts/projects/ProjectContext';
import TaskContext from '../../contexts/tasks/TaskContext';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListTask = () => {

    //Extraer State inicial Proyecto
    const projectsContext = useContext(ProjectContext);
    const { project, deleteProject } = projectsContext;

    //Extraer State inicial Tarea
    const taskContext = useContext(TaskContext);
    const { taskProject } = taskContext;
    
    //Si no hay proyectos 
    if(!project) return <h2>Selecciona un proyecto</h2>;
    const [actualProject] = project;



    return ( 
        <Fragment>
            <h2>Proyecto: {actualProject.name}</h2>

            <ul className="listado-tareas">
                {taskProject.length === 0 
                    ?(<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {taskProject.map( task => (
                             <CSSTransition
                                 key={task.id}
                                 timeout={400}
                                 classNames='tarea'
                             >
                                <Task
                                    task={task}
                                />
                             </CSSTransition>   
                        ))}
                    </TransitionGroup> 
                } 
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ () => deleteProject(actualProject._id) }
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListTask;