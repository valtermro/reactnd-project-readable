import { combineReducers } from 'redux';
import {
  CREATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS,

  VOTE_COMMENT_SUCCESS,
  VOTE_COMMENT_FAILURE,

  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,

  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
} from '../actions/comments';

function updateVoteScore(state = {}, action) {
  const inc = action.option === 'up' ? 1 : -1;

  switch (action.type) {
    case VOTE_COMMENT_SUCCESS: {
      return {
        ...state,
        voteScore: state.voteScore + inc,
      };
    }

    case VOTE_COMMENT_FAILURE: {
      return {
        ...state,
        voteScore: state.voteScore - inc,
      };
    }

    default: {
      return state;
    }
  }
}

function updateDeletedFlag(state = {}, action) {
  switch (action.type) {
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        deleted: true,
      };
    }

    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        deleted: false,
      };
    }

    default: {
      return state;
    }
  }
}

function entities(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        ...action.comments,
      };
    }

    case CREATE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_SUCCESS: {
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    }

    case VOTE_COMMENT_SUCCESS:
    case VOTE_COMMENT_FAILURE: {
      return {
        ...state,
        [action.comment.id]: updateVoteScore(state[action.comment.id], action),
      };
    }

    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        [action.comment.id]: updateDeletedFlag(state[action.comment.id], action),
      };
    }

    default: {
      return state;
    }
  }
}

function byPost(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        [action.postId]: Object.keys(action.comments),
      };
    }

    case CREATE_COMMENT_SUCCESS:
    case DELETE_COMMENT_FAILURE: {
      const { comment } = action;
      return {
        ...state,
        [comment.parentId]: state[comment.parentId].concat(comment.id),
      };
    }

    case DELETE_COMMENT_SUCCESS: {
      const { comment } = action;
      return {
        ...state,
        [comment.parentId]: state[comment.parentId].filter(id => id !== comment.id),
      };
    }

    default: {
      return state;
    }
  }
}

function loading(state = { loading: false, failed: false }, action) {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST: {
      return {
        failed: false,
        loading: true,
      };
    }

    case FETCH_COMMENTS_SUCCESS: {
      return {
        failed: false,
        loading: false,
      };
    }

    case FETCH_COMMENTS_FAILURE: {
      return {
        failed: true,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({ entities, byPost, loading });


export function get(state, id) {
  return state.comments.entities[id] || null;
}

export function getByPost(state, postId) {
  const comments = state.comments.byPost[postId];

  // Not loaded yet?
  if (!comments) return [];

  return comments.map(id => state.comments.entities[id]);
}

export function getLoading(state) {
  return state.comments.loading;
}
