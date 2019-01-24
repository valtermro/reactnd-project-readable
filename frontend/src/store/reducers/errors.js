import { generateUID } from '../../lib/util';
import { ADD_ERROR, REMOVE_ERROR } from '../actions/errors';

export default function errors(state = [], action) {
  switch (action.type) {
    case ADD_ERROR: {
      return state.concat({
        id: generateUID(),
        objectAction: action.objectAction,
        objectType: action.objectType,
        object: action.object,
      });
    }

    case REMOVE_ERROR: {
      return state.filter(error => error.id !== action.error.id);
    }

    default: {
      return state;
    }
  }
}

export function getAll(state) {
  return state.errors;
}
