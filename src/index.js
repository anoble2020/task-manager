import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style.css';
import Layout from './layouts/layout.js';
import Dashboard from './views/dashboard.js';
import Tasks from './views/tasks.js';
import Notes from './views/notes.js';
import NotFound from './views/not-found';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/notes" component={Notes} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));