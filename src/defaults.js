import { effects, addEffect } from "./effects";

const historyModes = ['browser', 'hash', 'memory'];

export const options = {
  initialState: undefined,
  reducers: {},
  addEffects: addEffect(effects),
  middlewares: [],
  historyMode: 'browser',
};

export default function defaults(opts = {}) {
  const { historyMode, middlewares, addEffect } = opts;

  if (historyMode && !historyModes.includes(historyMode)) {
    throw new Error(`historyMode "${historyMode}" is invalid, must be one of ${historyModes.join(', ')}!`)
  }

  if (middlewares && !Array.isArray(middlewares)) {
    throw new Error(`middlewares "${middlewares}" is invalid, must be an Array!`)
  }

  if (addEffect) {
    if (typeof addEffect !== 'function' || typeof addEffect({}) !== 'function') {
      throw new Error(`addEffect "${addEffect}" is invalid, must be a function that returns a function`)
    } else {
      opts.addEffect = opts.addEffect(effects)
    }
  }

  Object.keys(opts).forEach(key => {
    options[key] = opts[key]
  })
}