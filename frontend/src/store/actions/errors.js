export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export function addError(objectType, objectAction, object) {
  return {
    type: ADD_ERROR,
    objectType: objectType,
    objectAction: objectAction,
    object: object,
  };
}

export function removeError(error) {
  return {
    type: REMOVE_ERROR,
    error: error,
  };
}
