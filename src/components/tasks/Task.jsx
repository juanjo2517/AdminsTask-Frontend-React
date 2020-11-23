import React, { useContext } from 'react'
import TaskContext from '../../contexts/tasks/TaskContext';
import { DELETE_TASK } from '../../types';

const Task = ({task}) => {

    const taskContext = useContext(TaskContext);
    const { deleteTask, updateStateTask, getActualTask } = taskContext; 

    const updateStateTaskBtn = task => {
        if(task.state){
            task.state = false;
        }else{
            task.state = true;
        }

        updateStateTask(task);
    }


    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.state 
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
                    onClick={() => deleteTask(task.id)}
                >Eliminar</button>

            </div>
        </li>
     );
}
 
export default Task;