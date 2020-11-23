import React, { useReducer } from 'react';
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import { v4 as uuid } from 'uuid/dist';
import {
    FORM_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECT, 
    VALIDATE_FORM,
    REMOVE_ERROR, 
    ACTUAL_PROJECT,
    DELETE_PROJECT  
} from '../../types';


const ProjectState = props => {
    
    const projects = [
        {id:1, name: 'Tienda Virtual'},
        {id:2, name: 'Intranet con PHP'},
        {id:3, name: 'TupaU MERN-Docker'},  
        {id:4, name: 'Maquetado Web HTML'}
    ]
    const initialState = {
        projects : [],
        formProject: false,
        errorForm: false,
        project: null
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
    const getProjects = () => {
        dispacth({
            type: GET_PROJECTS,
            payload: projects
        });
    }

    //Agregar Proyecto 

    const addProject = project => {
        project.id = uuid();
        
        //Proyecto en el state
        dispacth({
            type: ADD_PROJECT,
            payload: project
        });
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

    const deleteProject = projectId => {
        dispacth({
            type: DELETE_PROJECT,
            payload: projectId
        })
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