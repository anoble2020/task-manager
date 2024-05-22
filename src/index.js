import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import { AuthContext, AuthProvider } from './auth/AuthContext.js';

import './style.css';
import Layout from './layouts/layout.js';
import Home from './views/home.js';
import Tasks from './views/tasks.js';
import Notes from './views/notes.js';
import NotFound from './views/not-found';

/*** AUTH ***/
import Login from './auth/login.js';
import SignUp from './auth/signup.js';
import SignIn from './auth/signin.js';
import ResetPassword from './auth/resetpw.js';

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/notes" component={Notes} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<AuthProvider><App /></AuthProvider>);