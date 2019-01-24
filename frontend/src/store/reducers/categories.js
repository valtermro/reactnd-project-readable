import { combineReducers } from 'redux';
import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,

  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/categories';

function entities(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        ...action.categories,
      };
    }

    case FETCH_CATEGORY_SUCCESS: {
      return {
        ...state,
        [action.category.id]: action.category,
      };
    }

    default: {
      return state;
    }
  }
}

function loading(state = { loading: false, failed: false }, action) {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
    case FETCH_CATEGORIES_REQUEST: {
      return {
        failed: false,
        loading: true,
      };
    }

    case FETCH_CATEGORY_SUCCESS:
    case FETCH_CATEGORIES_SUCCESS: {
      return {
        failed: false,
        loading: false,
      };
    }

    case FETCH_CATEGORY_FAILURE:
    case FETCH_CATEGORIES_FAILURE: {
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

export default combineReducers({ entities, loading });

export function get(state, id) {
  const category = state.categories.entities[id];

  // Not loaded yet?
  if (!category) return {};

  return category;
}

export function getAll(state) {
  return Object.values(state.categories.entities);
}

export function getLoading(state) {
  return state.categories.loading;
}
