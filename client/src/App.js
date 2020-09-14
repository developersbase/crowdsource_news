import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Alert from "./components/alert/alert.component";
import Spinner from "./components/spinner/spinner.component";
import Feed from "./components/feed/feed.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Publish from "./components/publish/publish.component";
import Login from "./components/login/login.component";
import SignUp from "./components/signup/signup.component";
import Post from "./components/post/post.component";
import NotFound from "./components/notfound/notfound.component";
import PrivateRoute from "./components/routing/private-route.component";
import ScrollToTop from "./components/routing/scroll-to-top.component";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import "./variables.scss";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <Header />
          <Alert />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Feed} />
            <PrivateRoute exact path="/publish" component={Publish} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/:id" component={Post} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
