import * as api from '../../lib/api';
import * as fromCategories from '../reducers/categories';
import { normalizeResponse } from '../../lib/util';

export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export function fetchCategory(id) {
  return async function (dispatch, getState) {
    const storedCategory = fromCategories.get(getState(), id);
    if (storedCategory && storedCategory.id) {
      return dispatch({ type: FETCH_CATEGORY_SUCCESS, category: storedCategory });
    }

    dispatch({ type: FETCH_CATEGORY_REQUEST });

    try {
      const category = await api.getCategory(id);

      dispatch({ type: FETCH_CATEGORY_SUCCESS, category: category });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORY_FAILURE });
    }
  };
}

export function fetchCategories() {
  return async function (dispatch) {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
      const categories = await api.getCategories();

      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        categories: normalizeResponse(categories),
      });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE });
    }
  };
}
