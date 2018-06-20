import React from "react";
import { Route, Router, Switch, dynamic } from "candee";
import "./App.css";

const Login = dynamic({
  model: () => import("./models/login"),
  component: () => import("./components/Login")
});

const Home = dynamic({
  component: () => import("./components/Home")
});

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
