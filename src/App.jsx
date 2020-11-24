import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import ProjectState from './contexts/projects/ProjectState'; 
import TaskState from './contexts/tasks/TaskState';
import AlertState from './contexts/alerts/AlertState';
import AuthState from './contexts/authentication/AuthState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';


//Revisar si hay Token 
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta" component={NewAccount}/>
                <PrivateRoute exact path="/proyectos" component={Projects}/>
              </Switch>
            </Router>
          </AuthState>  
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
