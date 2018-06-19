import { CALL_HISTORY_METHOD } from 'react-router-redux'
import { history } from './router'

export default function routerMiddleware() {
  return () => next => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action)
    }

    const { payload: { method, args } } = action
    history[method](...args)
  }
}