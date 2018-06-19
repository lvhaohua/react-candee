import { effects } from './effects'
import { WARN } from './constants'

function warning() {
  throw new Error(WARN.CALLING_DISPATCH_WITHOUT_MIDDLEWARE_WARN)
}

export let dispatch = warning;
export let getState = warning;

export default function createMiddleware(extraArgument) {
  return middlewareAPI => {
    dispatch = middlewareAPI.dispatch;
    getState = middlewareAPI.getState;

    return next => action => {
      if (typeof effects[action.type] === 'function') {
        return effects[action.type](action.data, getState, extraArgument)
      }
      return next(action)
    }
  }
}

