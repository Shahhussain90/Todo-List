import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Todo from './component/todo';
import Login from './component/login';
import Register from './component/register';
import Test from './component/test';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/test" component={Test} />
        <Route path="/" component={Todo} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
