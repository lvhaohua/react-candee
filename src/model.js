import { injectModel } from './actions';
import { isObject, getFullTypeName, filterHandles } from './utils';
import { options } from "./defaults";
import { store, replaceReducer } from "./store";
import { ERROR } from './constants';

export const models = [];

export default function model(m) {
  m = validateModel(m);

  const { name, initialState, reducers, effects } = m;

  const reducer = getReducer(renameReducers(name, reducers), initialState);

  const _m = {
    name,
    reducer      
  }

  models.push(_m)

  injectModel(name, reducers, effects);

  return _m;
}

export function dynamicModel(m) {
  const { name } = m;
  let needInject = false;
  models.forEach(m => {
    needInject = !(m.name === name);
  });
  if (needInject) {
    const { reducers } = options;
    const newModel = model(m);
    replaceReducer(store, newModel, reducers);
  }
}

// validate model
function validateModel(m = {}) {
  const {
    name,
    reducers,
    effects
  } = m

  if (!name || typeof name !== 'string') {
    throw new Error(ERROR.MODEL_NAME_MUST_BE_STRING)
  }

  if (name === 'routing') {
    throw new Error(ERROR.MODEL_CAN_NOT_BE_ROUTING)
  }

  if (models.find(item => item.name === name)) {
    throw new Error(`Model "${name}" has been created, please select another name!`)
  }

  if (reducers !== undefined && !isObject(reducers)) {
    throw new Error(ERROR.MODEL_REDUCER_MUST_BE_VALID_OBJECT)
  }

  if (effects !== undefined && !isObject(effects)) {
    throw new Error(ERROR.MODEL_EFFECTS_MUST_BE_VALID_OBJECT)
  }

  m.reducers = filterHandles(reducers)
  m.effects = filterHandles(effects)
  return m
}

function renameReducers(modelName, reducers = {}) {
  return Object.keys(reducers).reduce((acc, cur) => {
    acc[getFullTypeName(modelName, cur)] = reducers[cur];
    return acc;
  }, {})
}

function getReducer(reducers, initialState = null) {
  return (state = initialState, action) => {
    if (typeof reducers[action.type] === 'function') {
      return reducers[action.type](state, action.data)
    }
    return state;
  }
}