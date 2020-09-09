import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Feed from "./components/feed/feed.component";
import Header from "./components/header/header.component";
import Publish from "./components/publish/publish.component";
import Login from "./components/login/login.component";
import SignUp from "./components/signup/signup.component";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route exact path="/publish" component={Publish} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
