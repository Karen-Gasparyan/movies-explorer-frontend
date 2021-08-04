import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Register from './Register/Register';
import Login from './Login/Login';

function App() {

  return (
    <div className="page">
      <Switch>
        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
