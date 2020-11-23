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

export default (state, action) => {
    switch(action.type){
        case TASK_PROJECT:
            return {
                ...state,
                taskProject: state.tasks.filter( task => task.projectId === action.payload )
            }
        case ADD_TASK_PROJECT:
            return {
                ...state,
                tasks: [ action.payload, ...state.tasks],
                taskProject: [ action.payload, ...state.taskProject]
            }
        case VALIDATE_TASK_PROJECT:
            return {
                ...state,
                errorForm: true
            }
        case REMOVE_ERROR_TASK:
            return {
                ...state,
                errorForm: false
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                taskProject: state.taskProject.filter(task => task.id !== action.payload)
            }
        case UPDATE_TASK:
        case UPDATE_STATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task ),
                taskProject:  state.taskProject.map(task => task.id === action.payload.id ? action.payload : task )
            }
        case ACTUA_TASK:
            return {
                ...state,
                taskSelected: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                taskSelected: null    
            }
        default:
            return state;
    } 
}