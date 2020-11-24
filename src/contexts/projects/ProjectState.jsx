import React, { useReducer } from 'react';
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import axiosClient from '../../config/axios';

import {
    FORM_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECT, 
    VALIDATE_FORM,
    REMOVE_ERROR, 
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR  
} from '../../types';


const ProjectState = props => {
    
    const initialState = {
        projects : [],
        formProject: false,
        errorForm: false,
        project: null,
        message: null
    }

    //Dispatch para ejecutar las acciones 
    const [state, dispacth] = useReducer(ProjectReducer, initialState);

    //Serie de funciones para el CRUD
    const viewFormNewProject = () => {
        dispacth({
            type: FORM_PROJECT
        })
    }

    //Obtener los proyectos 
    const getProjects = async () => {
       try {
            const response = await axiosClient.get('/api/project'); 
            dispacth({
                type: GET_PROJECTS,
                payload: response.data.projects
            });
       } catch (error) {
           console.log(error.response);
       }
    }

    //Agregar Proyecto 

    const addProject = async project => {
        try {
            const response = await axiosClient.post('/api/project', project);
            console.log(response.data.project);
            dispacth({
                type: ADD_PROJECT,
                payload: response.data.project
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Validar formulario y mostrar Error 

    const viewError = () => {
        dispacth({
            type: VALIDATE_FORM
        });
    }

    //Remueve el error 
    const removeError = () => {
        dispacth({
            type: REMOVE_ERROR
        });
    }

    // Selecciona el proyecto que el usuario clickea
    const actualProject = projectId => {
        dispacth({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/project/${projectId}`);
            dispacth({
                type: DELETE_PROJECT,
                payload: projectId
            });
        } catch (error) {
            const alert = {
                msg: 'Hubo un error al intentar eliminar el proyecto',
                category: 'alerta-error'
            }
            dispacth({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                formProject: state.formProject,
                errorForm: state.errorForm,
                viewFormNewProject,
                project: state.project,
                getProjects,
                addProject,
                viewError,
                removeError,
                actualProject, 
                deleteProject   
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
}

export default ProjectState;