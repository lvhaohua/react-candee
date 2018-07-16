import * as React from "react";
import * as H from "history";
import { Connect } from "react-redux";
import { routerActions } from "react-router-redux";

export { Route, Switch, Redirect, Prompt, withRouter } from "react-router";
export { Link, NavLink } from "react-router-dom";

export interface defaultOptions {
  initialState?: {};
  reducers: {};
  addEffects(effectName: string, effectHandle: () => any): any;
  middlewares: any[];
  historyMode?: string;
}

export interface model {
  name: string;
  initialState?: any;
  reducers?: any;
  effects?: any;
}

export interface _model {
  name: string;
  reducer: any;
}

export interface Actions {
  [propName: string]: any;
  routing: routerActions;
}

export interface dynamicConfig {
  model?: Function;
  component: Function;
}

export interface ConnectedRouterProps<State> {
  store?: any;
  history?: H.History;
}

export function defaults(): (options: defaultOptions) => void;
export function model(options: model): _model;
export function dynamic(): (config: dynamicConfig) => void;

export const connect: Connect;
export const actions: Actions;
export const render: any; // TODO

export class Router<State> extends React.Component<ConnectedRouterProps<State>> {}
