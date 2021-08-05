import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
// import Register from './Register/Register';
// import Login from './Login/Login';
import Profile from './Profile/Profile';

function App() {

  return (
    <div className="page">
      <Switch>
        {/* <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route> */}

        <Route path=''>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
