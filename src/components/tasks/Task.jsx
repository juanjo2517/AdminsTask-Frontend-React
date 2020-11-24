import React, { useContext } from 'react'
import TaskContext from '../../contexts/tasks/TaskContext';
import ProjectContext from '../../contexts/projects/ProjectContext';


const Task = ({task}) => {

    const taskContext = useContext(TaskContext);
    const { deleteTask, updateTask, getActualTask } = taskContext; 

    const projectConext = useContext(ProjectContext);
    const { project } = projectConext;

    const updateStateTaskBtn = task => {
        
        if(task.status){
            task.status = false;
            
            
        }else{
            task.status = true;
            
        }

        updateTask(task);
    }


    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.status 
                ?(
                    <button
                        type="button"
                        className="completo"
                        onClick={() => updateStateTaskBtn(task)}
                    >Completado</button>
                 )
                
                :(
                    <button
                        type="button"
                        className="incompleto"
                        onClick={() => updateStateTaskBtn(task)}
                    >Incompleto</button>
                 )  
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => getActualTask(task)}
                >Editar</button>
                
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deleteTask(task._id, project[0]._id)}
                >Eliminar</button>

            </div>
        </li>
     );
}
 
export default Task;