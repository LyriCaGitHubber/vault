import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import AddCredentials from './pages/AddCredentials/AddCredentials';
import Search from './pages/Search';
import Edit from './pages/Edit/Edit';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/credential/:service/edit">
          <Edit />
        </Route>
        <Route path="/credential/add">
          <AddCredentials />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
