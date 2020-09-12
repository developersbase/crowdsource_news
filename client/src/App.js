import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Feed from "./components/feed/feed.component";
import Header from "./components/header/header.component";
import Publish from "./components/publish/publish.component";
import Login from "./components/login/login.component";
import SignUp from "./components/signup/signup.component";
import Post from "./components/post/post.component";
import NotFound from "./components/notfound/notfound.component";
import PrivateRoute from "./components/routing/private-route.component";

import { Provider } from "react-redux";
import store from "./redux/store";

//import "./variables.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Feed} />
          <PrivateRoute exact path="/publish" component={Publish} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/:id" component={Post} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
