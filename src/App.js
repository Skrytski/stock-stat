import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import './App.css';



function App() {
  return (
    <div className="App">
      <Redirect to="/dashboard" />
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
    </div>
  );
}

export default App;
