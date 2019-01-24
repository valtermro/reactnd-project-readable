import { combineReducers } from 'redux';
import { unique } from '../../lib/util';

import {
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from '../actions/comments';

import {
  CREATE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,

  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,

  FETCH_POST_SUCCESS,
  FETCH_POST_NOENT,
  FETCH_POST_REQUEST,
  FETCH_POST_FAILURE,

  FETCH_POSTS_BY_CATEGORY_REQUEST,
  FETCH_POSTS_BY_CATEGORY_SUCCESS,
  FETCH_POSTS_BY_CATEGORY_FAILURE,

  VOTE_POST_SUCCESS,
  VOTE_POST_FAILURE,
} from '../actions/posts';

function byCategory(state = {}, action) {
  switch (action.type) {
    case CREATE_POST_SUCCESS: {
      const { id, category } = action.post;
      return {
        ...state,
        // A user cannot manually create a post for the "all" category but all posts
        // should be added to it. (it's the category for "all" posts, after all...)
        all: (state.all || []).concat(id),
        [category]: (state[category] || []).concat(id),
      };
    }

    case DELETE_POST_SUCCESS: {
      const { category } = action.post;
      const filterFn = id => id !== action.post.id;

      return {
        ...state,
        all: (state.all || []).filter(filterFn),
        [category]: (state[category] || []).filter(filterFn),
      };
    }

    case DELETE_POST_FAILURE: {
      const { id, category } = action.post;
      return {
        ...state,
        all: unique((state.all || []).concat(id)),
        [category]: unique((state[category] || []).concat(id)),
      };
    }

    case FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        [action.category]: Object.keys(action.posts),
      };
    }

    default: {
      return state;
    }
  }
}

function updateCommentCount(state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        commentCount: state.commentCount + 1,
      };
    }

    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        commentCount: state.commentCount - 1,
      };
    }

    default: {
      return state;
    }
  }
}

function updateVoteScore(state = {}, action) {
  const inc = action.option === 'up' ? 1 : -1;

  switch (action.type) {
    case VOTE_POST_SUCCESS: {
      return {
        ...state,
        voteScore: state.voteScore + inc,
      };
    }

    case VOTE_POST_FAILURE: {
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
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        deleted: true,
      };
    }

    case DELETE_POST_FAILURE: {
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
    case CREATE_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        [action.comment.parentId]: updateCommentCount(state[action.comment.parentId], action),
      };
    }

    case FETCH_POST_SUCCESS:
    case CREATE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS: {
      return {
        ...state,
        [action.post.id]: action.post,
      };
    }

    case VOTE_POST_SUCCESS:
    case VOTE_POST_FAILURE: {
      return {
        ...state,
        [action.post.id]: updateVoteScore(state[action.post.id], action),
      };
    }

    case DELETE_POST_SUCCESS:
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        [action.post.id]: updateDeletedFlag(state[action.post.id], action),
      };
    }


    case FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        ...action.posts,
      };
    }

    default: {
      return state;
    }
  }
}

function loading(state = { loading: false, failed: false }, action) {
  switch (action.type) {
    case FETCH_POST_REQUEST:
    case FETCH_POSTS_BY_CATEGORY_REQUEST: {
      return {
        failed: false,
        loading: true,
      };
    }

    case FETCH_POST_SUCCESS:
    case FETCH_POST_NOENT:
    case FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      return {
        failed: false,
        loading: false,
      };
    }

    case FETCH_POST_FAILURE:
    case FETCH_POSTS_BY_CATEGORY_FAILURE: {
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

export default combineReducers({ entities, byCategory, loading });

export function get(state, id) {
  const post = state.posts.entities[id];
  return !post || post.deleted ? null : post;
}

export function getByCategory(state, category) {
  const posts = state.posts.byCategory[category];

  // Not loaded yet?
  if (!posts) return [];

  return posts
    .map(id => state.posts.entities[id])
    .filter(post => !post.deleted);
}

export function getLoading(state) {
  return state.posts.loading;
}
