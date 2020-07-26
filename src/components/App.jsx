import React from 'react';
import NavigateBar from './NavigateBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  return (
    // we would always have navbar render

    // Use router to switch route accordingly
    // <Router> <Switch> <Route to=/login/ component={login}>
    <Router>
      <div>
        <NavigateBar />
        <Login />
      </div>
    </Router>
  );
};

export default App;
