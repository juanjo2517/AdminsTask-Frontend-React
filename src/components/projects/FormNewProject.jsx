import React, { Fragment, useContext, useState } from 'react'
import ProjectContext from '../../contexts/projects/ProjectContext';

const FormNewProject = () => {
    
    //Obtener State del formulario
    const projectsContext = useContext(ProjectContext); 
    const { 
        formProject, 
        errorForm, 
        viewFormNewProject, 
        addProject, 
        viewError,
        removeError 
    } = projectsContext;
    
    //State para proyecto
    const [project, saveProject] = useState({
        name: '',
    });

    //Extraer nombre del proyecto
    const { name } = project;

    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitProject = e => {
        e.preventDefault();

        //Validar
        if(name.trim() === ''){
            viewError();
            setTimeout(() => {
                removeError();
            }, 4000);
            return;
        }

        //Agregar al State
        addProject(project);

        //Reiniciar el Form
        saveProject({
            name:' '
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => viewFormNewProject()}
            >Nuevo Proyecto</button>

            {
                formProject
                ? (
                    <form 
                    onSubmit={onSubmitProject}
                    className="formulario-nuevo-proyecto"
                    >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="name"
                        value={name}
                        onChange={onChangeProject}
                    />
    
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Crear Proyecto"
                    />
                    </form>
                )

                : null }

                {errorForm 
                ? 
                    <p 
                    className="mensaje error"
                    >El nombre del proyecto es obligatorio</p>

                : null}

        </Fragment>
     );
}
 
export default FormNewProject;