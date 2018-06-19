// global effects
export const effects = {};

export const addEffect = effects => (effectName, effectHandle) => {
  effects[effectName] = effectHandle;
}