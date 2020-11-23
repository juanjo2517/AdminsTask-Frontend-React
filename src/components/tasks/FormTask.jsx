import React, { useContext, useState, useEffect } from 'react'
import ProjectContext from '../../contexts/projects/ProjectContext';
import TaskContext from '../../contexts/tasks/TaskContext';
import TaskState from '../../contexts/tasks/TaskState';

const FormTask = () => {

    //InitialState de Proyectos
    const projectsContext = useContext(ProjectContext);
    const { project } = projectsContext;
    
    //InitialState de tareas
    const taskContext = useContext(TaskContext);
    const { 
        errorForm, 
        taskSelected,
        addTaskProject, 
        viewError, 
        removeError,
        updateTask,
        cleanTaskSelected
    } = taskContext; 

    //Efect si hay tarea selecciona
    useEffect(() => {
        if(taskSelected !== null){
              saveTasks(taskSelected);
        }else{
            saveTasks({
                name: '',
                state: false,
                projectId: 0
            });
        }
    }, [taskSelected]);

    //State para tareas
    
    const [taskProject, saveTasks] = useState({
        name: '',
        state: false,
        projectId: 0
    }); 

    const { name } = taskProject;
    //Si no hay proyectos seleccionados
    if(!project) return null;
    const [actualProject] = project;



    const onChangeTask = e => {
        saveTasks({
            ...taskProject,
            [e.target.name]: e.target.value,
            state: false,
            projectId: actualProject.id
        });
    }

    const onSubmitTask = e => {
        e.preventDefault();

        //Validar form
        if(name.trim() === ''){
            viewError();
            setTimeout(() => {
                removeError();
            }, 4000);
            return;
        }

        //Si es editar o nueva tarea
        if(taskSelected === null){
            //tarea nueva
            addTaskProject(taskProject);
        }else{
            //Actualizar tarea
            updateTask(taskProject);

            //limpia tarea Seleccionada
            cleanTaskSelected();
        }

        //Enviar a initialState

        saveTasks({
            name: '',
            projectId: 0
        });
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmitTask}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text" 
                        name="name"
                        value={name}
                        onChange={onChangeTask}
                        placeholder={`Agrega una tarea al proyecto ${actualProject.name}`} 
                        />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-submit btn-block"
                        value={taskSelected ? 'Editar Tarea': 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errorForm 
            ?  <p className="mensaje error">El nombre de la tarea es obligatoria</p> 
            : null}
        </div>
     );
}
 
export default FormTask;