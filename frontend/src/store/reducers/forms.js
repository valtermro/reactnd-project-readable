import { combineReducers } from 'redux';
import {
  OPEN_POST_FORM,
  CLOSE_POST_FORM,

  OPEN_COMMENT_FORM,
  CLOSE_COMMENT_FORM,
} from '../actions/forms';

function post(
  state = { isOpen: false, category: null, post: null },
  action
) {
  switch (action.type) {
    case OPEN_POST_FORM: {
      return {
        isOpen: true,
        category: action.category,
        post: action.post,
      };
    }

    case CLOSE_POST_FORM: {
      return {
        isOpen: false,
        category: null,
        post: null,
      };
    }

    default: {
      return state;
    }
  }
}

function comment(
  state = { isOpen: false, parentId: '', comment: null },
  action
) {
  switch (action.type) {
    case OPEN_COMMENT_FORM: {
      return {
        isOpen: true,
        parentId: action.parentId,
        comment: action.comment,
      };
    }

    case CLOSE_COMMENT_FORM: {
      return {
        isOpen: false,
        parentId: '',
        comment: null,
      };
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({ post, comment });


export function get(state, form) {
  return state.forms[form];
}
