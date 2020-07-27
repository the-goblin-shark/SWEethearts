import React, { Fragment } from 'react';
import Landing from './Landing.jsx';
import Explore from './Explore.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NavigateBar from './NavigateBar';
import IdeaPage from './IdeaPage';
import SubmitIdea from './SubmitIdea';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <Router>
      {/* Using Fragment rather than native div to avoid React warnings */}
      <Fragment>
        {/* Navigation Bar is ever-present */}
        <NavigateBar />
        {/* Use the first Route whose path matches current URL */}
        <Switch>
          {/* Render given component if given path matches current URL */}
          {/* <Route exact path="/" component={Landing} /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/idea" component={IdeaPage} />
          <Route exact path="/submit" component={SubmitIdea} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
