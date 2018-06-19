import React from 'react'
import PropTypes from 'prop-types'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import { ConnectedRouter, routerActions } from 'react-router-redux'

import { options } from './defaults'
import { dispatch } from './middleware'
import { actions } from './actions'

export let history = null;

export default function Router({ history: _history, children, ...others }) {
  if (!_history) {
    _history = createHistory(others);
  }

  history = _history;

  // inject routerActions props into actions.routing
  actions.routing = Object.keys(routerActions).reduce((acc, crrAction) => {
    acc[crrAction] = (...args) => {
      dispatch(routerActions[crrAction](...args));
    }
    return acc;
  }, {})

  return (
    <ConnectedRouter history={_history}>
      {children}
    </ConnectedRouter>
  )
}

Router.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object
}

function createHistory(props) {
  const { historyMode } = options;

  const historyModes = {
    browser: createBrowserHistory,
    hash: createHashHistory,
    memory: createMemoryHistory
  };

  history = historyModes[historyMode](props);

  return history;
}