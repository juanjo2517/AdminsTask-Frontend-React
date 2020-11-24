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
        tasks : [],
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

