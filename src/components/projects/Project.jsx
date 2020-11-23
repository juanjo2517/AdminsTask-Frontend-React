import React, { useContext } from 'react'
import ProjectContext from '../../contexts/projects/ProjectContext';
import TaskContext from '../../contexts/tasks/TaskContext';


const Project = ({project}) => {
    
    //Context de pryecto
    const projectsContext = useContext(ProjectContext);
    const { actualProject } = projectsContext;

    //Context de tarea
    const taskContext = useContext(TaskContext);
    const { getTaskProjects } = taskContext;

    //Funcion para proyecto actual
    const selectProject = id => {
        actualProject(id); 
        getTaskProjects(id);
    }
    

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project.id)}
            >{project.name}</button>
        </li>
     );
}
 
export default Project;  