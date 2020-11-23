import React, { useReducer } from 'react';
//import ProjectContext from '../projects/ProjectContext';
import TaskContext from '../tasks/TaskContext';
import TaskReducer from '../tasks/TaskReducer';
import { v4 as uuid } from 'uuid/dist';
import { 
    TASK_PROJECT, 
    ADD_TASK_PROJECT,
    VALIDATE_TASK_PROJECT,
    REMOVE_ERROR_TASK,
    DELETE_TASK,
    UPDATE_STATE_TASK,
    ACTUA_TASK,
    UPDATE_TASK,
    CLEAN_TASK   
 } from '../../types'

const TaskState = props => {


    const initialState = {
        tasks : [
            {id: 1,name: 'Crear paginas de Login y registro', state: true, projectId:3},
            {id: 2,name: 'Elegir Hosting y Dominio', state: false, projectId:1},
            {id: 3,name: 'Usar el empaquetado de Docker', state: true, projectId:3},
            {id: 4,name: 'Usar CMS Shopify', state: true, projectId:1},
            {id: 5,name: 'Crear API sencilla', state: true, projectId:2},
            {id: 6,name: 'Crear los modelos y controladores', state: false, projectId:2},
            {id: 7,name: 'Revisar rutas', state: true, projectId:2},
            {id: 8,name: 'Revisar fallo en la base de datos', state: false, projectId:3},
            {id: 9,name: 'Crear las vistas para home ', state: true, projectId:2},
            {id: 10,name: 'Crear API para registro de usuarios', state: false, projectId:3},
            {id: 11,name: 'Realizar el diseño de las alertas', state: true, projectId:4},
            {id: 12,name: 'Realziar el Header y Footer', state: true, projectId:4}
        ],
        taskProject: null,
        errorForm: false,
        taskSelected: null
    }

    //Crear Dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //funciones

    //Tareas de un proyecto 
    const getTaskProjects = projectId => {
        dispatch({
            type: TASK_PROJECT,
            payload: projectId
        });
    }

    const addTaskProject = taskProject => {
        taskProject.id = uuid();
        dispatch({
            type: ADD_TASK_PROJECT,
            payload: taskProject
        });
    }

    const viewError = () =>{
        dispatch({
            type: VALIDATE_TASK_PROJECT
        });
    }

    const removeError = () => {
        dispatch({
            type: REMOVE_ERROR_TASK
        });
    }

    const deleteTask = taskId => {
        dispatch({
            type: DELETE_TASK,
            payload: taskId
        });
    }

    const updateStateTask = task => {
        dispatch({
            type: UPDATE_STATE_TASK,
            payload: task
        });
    }

    const getActualTask = task => {
        dispatch({
            type: ACTUA_TASK,
            payload: task
        })
    }

    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }

    const cleanTaskSelected = () => {
        dispatch({
            type: CLEAN_TASK
        });
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                taskProject: state.taskProject,
                errorForm: state.errorForm,
                taskSelected: state.taskSelected,
                getTaskProjects,
                addTaskProject,
                viewError,
                removeError,
                deleteTask,
                updateStateTask,
                getActualTask,
                updateTask,
                cleanTaskSelected
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )

}

export default TaskState;

