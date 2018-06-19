import { options } from './defaults'
import { dispatch } from './middleware'
import { getFullTypeName } from './utils'

export const actions = {};

// auto dispatch action
function actionCreator(modelName, actionName) {
  return data => (
    dispatch({
      type: getFullTypeName(modelName, actionName),
      data
    })
  )
}

export function injectModel(modelName, reducers = {}, effects = {}) {
  // create actions.someModel
  if (Object.keys(reducers).length > 0 || Object.keys(effects).length > 0) {
    actions[modelName] = actions[modelName] || {};
  }

  // inject reducers
  Object.keys(reducers).forEach(reducerName => {
    actions[modelName][reducerName] = actionCreator(modelName, reducerName);
  });

  // inject effects
  Object.keys(effects).forEach(effectName => {
    // name is defined
    if (actions[modelName][effectName]) {
      throw new Error(`Name '${effectName}' has been used in ${modelName}, please use another name!`);
    }

    // inject in global effects
    options.addEffects(getFullTypeName(modelName, effectName), effects[effectName]);
    actions[modelName][effectName] = actionCreator(modelName, effectName);
    actions[modelName][effectName]['isEffect'] = true;
  })
}