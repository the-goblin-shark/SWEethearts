import React from 'react'
import NavigateBar from './NavigateBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    // we would always have navbar render

    // Use router to switch route accordingly
    // <Router> <Switch> <Route to=/login/ component={login}>
    <Router>
      <div>
        <NavigateBar />
      </div>
    </Router>
  );
}

export default App
