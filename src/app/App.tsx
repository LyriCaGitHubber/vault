import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Password from './pages/Password/Password';
import AddCredentials from './pages/AddCredentials/AddCredentials';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/password/:service/:name">
          <Password />
        </Route>
        <Route path="/add">
          <AddCredentials />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
