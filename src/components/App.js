import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Register from './Register/Register';

function App() {

  return (
    <div className="page">
      <Route>
        <Register />
      </Route>
    </div>
  );
}

export default App;
