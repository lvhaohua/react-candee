import { CONSTANT } from '../constants';

// modelName/handleName
export const getFullTypeName = (modelName, handleName) => {
  return `${modelName}${CONSTANT.SEP}${handleName}`
}

// is valid object
export const isObject = target => Object.prototype.toString.call(target) === '[object Object]'

// filter reducers and effects
export const filterHandles = handles => {
  if (!handles) return handles;
  return Object.keys(handles).reduce((acc, action) => {
    if (typeof handles[action] === 'function') {
      acc[action] = handles[action]
    }
    return acc
  }, {})
}

