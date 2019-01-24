import { combineReducers } from 'redux';
import { START_WAITING, STOP_WAITING } from '../actions/pageState';

function isWaiting(state = false, action) {
  switch (action.type) {
    case START_WAITING: {
      return true;
    }

    case STOP_WAITING: {
      return false;
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({ isWaiting });


export function getState(state) {
  return state.pageState;
}
