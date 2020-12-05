import { Route, Redirect, Switch, Prompt, withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import model from "./model";
import dynamic from "./dynamic";
import { actions } from "./actions";
import render from "./render";
import Router from "./router";
import defaults from "./defaults";
 
export default {
  model,
  actions,
  defaults,
  connect, // import from react-redux
  render,

  Router, // bind react-router-redux

  Route, // import from react-router
  Link, // import from react-router-dom
  NavLink, // import from react-router-dom
  Switch, // import from react-router
  Redirect, // import from react-router
  Prompt, // import from react-router
  withRouter, // import from react-router

  dynamic // dynamic inject model and component
};

export {
  model,
  actions,
  defaults,
  connect,
  render,
  Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  Prompt,
  withRouter,
  dynamic
};
