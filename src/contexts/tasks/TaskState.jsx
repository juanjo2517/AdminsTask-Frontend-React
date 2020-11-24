import React, { useReducer } from 'react';
//import ProjectContext from '../projects/ProjectContext';
import TaskContext from '../tasks/TaskContext';
import TaskReducer from '../tasks/TaskReducer';
import axiosCliente from '../../config/axios';
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
import axiosClient from '../../config/axios';

const TaskState = props => {


    const initialState = {
        taskProject: [],
        errorForm: false,
        taskSelected: null
    }

    //Crear Dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //funciones

    //Tareas de un proyecto 
    const getTaskProjects = async project => {
        try {
            const response = await axiosClient.get('/api/task', {params: { project }});

            dispatch({
                type: TASK_PROJECT,
                payload: response.data.tasks
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    const addTaskProject = async taskProject => {
        try {
            const response = await axiosClient.post('/api/task', taskProject);
            dispatch({
                type: ADD_TASK_PROJECT,
                payload: response.data.task
            });
            
        } catch (error) {
            console.log(error.response);
        }
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

    const deleteTask = async (taskId, project) => {
        try {
            await axiosClient.delete(`/api/task/${taskId}`, { params: { project } });
            dispatch({
                type: DELETE_TASK,
                payload: taskId
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    const updateTask = async task => {
        try {
            const response = await axiosClient.put(`/api/task/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            })
            
        } catch (error) {
            console.log(error.response);
        }
    }
    const getActualTask = task => {
        dispatch({
            type: ACTUA_TASK,
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
                taskProject: state.taskProject,
                errorForm: state.errorForm,
                taskSelected: state.taskSelected,
                getTaskProjects,
                addTaskProject,
                viewError,
                removeError,
                deleteTask,
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

