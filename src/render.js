import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { options } from './defaults'
import { models } from './model'
import { store, createStore, replaceReducer } from './store'

let started = false;
let Root;

export default function render(component, container, callback) {
  const { reducers, initialState, middlewares } = options;

  if (started) {
    replaceReducer(store, models, reducers);
    if (arguments.length === 0) {
      return Root;
    }
  } else {
    createStore(models, reducers, initialState, middlewares);
  }

  Root = function Root() {
    return (
      <Provider store={store}>
        {component}
      </Provider>
    )
  }

  started = true;
  window.document && ReactDOM.render(<Root />, container, callback);
  return Root;
}
