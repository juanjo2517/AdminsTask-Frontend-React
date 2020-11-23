import React from 'react';
import FormNewProject from '../projects/FormNewProject';
import ListProjects from '../projects/ListProjects';
import Project from '../projects/Project';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>AdminTaks <span>MERN</span></h1>

            <FormNewProject/>

            <div className="proyectos">
                <h2>Tus proyectos</h2>
                
                <ListProjects/>
            </div>
        </aside>
     );
}
 
export default Sidebar;