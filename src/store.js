import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux";
import { routerReducer } from "react-router-redux";
import createMiddleware from "./middleware";
import routerMiddleware from "./routerMiddleware";

export let store;
export let modelReducers = {};

export function createStore(models, reducers, initialState, middlewares = []) {
  const middleware = applyMiddleware(
    routerMiddleware(),
    ...middlewares,
    createMiddleware()
  );

  const composeEnhancers =
    (process.env.NODE_ENV === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const reducer = createReducer(models, reducers);
  const enhancer = composeEnhancers(middleware);

  store = _createStore(reducer, initialState, enhancer);
  store.modelReducers = modelReducers;
  return store;
}

function makeRootReducer(modelReducers, initReducers) {
  return combineReducers({
    ...initReducers,
    ...modelReducers,
    routing: routerReducer
  });
}

function createReducer(models, reducers) {
  modelReducers = models.reduce((acc, cur) => {
    acc[cur.name] = cur.reducer;
    return acc;
  }, {});

  return makeRootReducer(modelReducers, reducers);
}

export function replaceReducer(store, models, reducers) {
  if (Array.isArray(models) && models.length > 0) {
    models.forEach(m => {
      store.modelReducers[m.name] = m.reducer;
    });
  } else {
    const { name, reducer } = models;
    store.modelReducers[name] = reducer;
  }
  store.replaceReducer(makeRootReducer(store.modelReducers, reducers));
}
