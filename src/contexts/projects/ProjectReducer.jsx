import {
    FORM_PROJECT,
    GET_PROJECTS, 
    ADD_PROJECT,
    VALIDATE_FORM, 
    REMOVE_ERROR,
    ACTUAL_PROJECT, 
    DELETE_PROJECT
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case FORM_PROJECT:
            return {
                ...state,
                formProject: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return{
                ...state,
                projects: [action.payload, ...state.projects],
                formProject: false,
                errorForm: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                errorForm: true,
                
            }
        case REMOVE_ERROR:
            return{
                ...state,
                errorForm: false
            }
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project.id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                project: null,
                projects: state.projects.filter(project => project.id != action.payload)
            }
        default:
            return state;
    }
} 