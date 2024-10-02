import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import Dashboard from './pages/Dashboard';
import ResumeQA from './pages/ResumeQA';
import CompanyQA from './pages/CompanyQA';
import RoleQA from './pages/RoleQA';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <ProtectedRoute path="/input" component={InputPage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/resume-qa" component={ResumeQA} />
      <ProtectedRoute path="/company-qa" component={CompanyQA} />
      <ProtectedRoute path="/role-qa" component={RoleQA} />
      <ProtectedRoute path="/profile" component={Profile} />
    </Switch>
  );
}

export default App;
