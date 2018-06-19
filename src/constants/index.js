export const ERROR = {
  // reducer is defined
  REDUCER_IS_DEFINED_ERROR: ``,
  MODEL_NAME_MUST_BE_STRING: `Model name must be a valid string!`,
  MODEL_CAN_NOT_BE_ROUTING: `Model name can not be "routing", it is used by react-router-redux!`,
  MODEL_REDUCER_MUST_BE_VALID_OBJECT: `Model reducers must be a valid object!`,
  MODEL_EFFECTS_MUST_BE_VALID_OBJECT: `Model effects must be a valid object!`,
}

export const WARN = {
  CALLING_DISPATCH_WITHOUT_MIDDLEWARE_WARN: `You can not calling "dispatch" or "getState" without applying middleware!
  Please create your store with middleware first!`
}

export const CONSTANT = {
  SEP: '/'
}