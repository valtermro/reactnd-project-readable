import * as api from '../../lib/api';
import * as fromPosts from '../reducers/posts';
import { normalizeResponse } from '../../lib/util';
import { ObjectType, ObjectAction } from '../../constants';
import { addError } from './errors';
import { closePostForm } from './forms';
import { startWaiting, stopWaiting } from './pageState';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';

export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE';

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POST_NOENT = 'FETCH_POST_NOENT';

export const FETCH_POSTS_BY_CATEGORY_REQUEST = 'FETCH_POSTS_BY_CATEGORY_REQUEST';
export const FETCH_POSTS_BY_CATEGORY_SUCCESS = 'FETCH_POSTS_BY_CATEGORY_SUCCESS';
export const FETCH_POSTS_BY_CATEGORY_FAILURE = 'FETCH_POSTS_BY_CATEGORY_FAILURE';

export function createPost(data) {
  return async function (dispatch) {
    dispatch(startWaiting());

    try {
      const post = await api.createPost(data);

      dispatch({ type: CREATE_POST_SUCCESS, post: post });
      dispatch(closePostForm());
    } catch (error) {
      dispatch(addError(ObjectType.Post, ObjectAction.Create, null));
    } finally {
      dispatch(stopWaiting());
    }
  };
}


export function updatePost(post, data) {
  return async function (dispatch) {
    dispatch(startWaiting());

    try {
      const updatedPost = await api.updatePost(post.id, data);

      dispatch({ type: UPDATE_POST_SUCCESS, post: updatedPost });
      dispatch(closePostForm());
    } catch (error) {
      dispatch(addError(ObjectType.Post, ObjectAction.Update, post));
    } finally {
      dispatch(stopWaiting());
    }
  };
}

export function deletePost(post, optimistic) {
  return async function (dispatch) {
    if (optimistic) {
      dispatch({ type: DELETE_POST_SUCCESS, post: post });
    } else {
      dispatch(startWaiting());
    }

    try {
      await api.deletePost(post.id);

      if (!optimistic) {
        dispatch({ type: DELETE_POST_SUCCESS, post: post });
      }

      dispatch(stopWaiting());
      return true;
    } catch (error) {
      dispatch(addError(ObjectType.Post, ObjectAction.Delete, post));

      if (optimistic) {
        // Put the post back in the store
        dispatch({ type: DELETE_POST_FAILURE, post: post });
      } else {
        dispatch(stopWaiting());
      }
      return false;
    }
  };
}

export function fetchPost(id) {
  return async function (dispatch, getState) {
    const storedPost = fromPosts.get(getState(), id);
    if (storedPost && storedPost.id) {
      return dispatch({ type: FETCH_POST_SUCCESS, post: storedPost });
    }

    dispatch({ type: FETCH_POST_REQUEST });

    try {
      const post = await api.getPost(id);

      // The api server returns an empty object if the post does not exist.
      if (!post.id) {
        dispatch({ type: FETCH_POST_NOENT });
      } else {
        dispatch({ type: FETCH_POST_SUCCESS, post: post });
      }
    } catch (error) {
      dispatch({ type: FETCH_POST_FAILURE });
    }
  };
}

export function fetchPosts(category) {
  return async function (dispatch) {
    try {
      dispatch({ type: FETCH_POSTS_BY_CATEGORY_REQUEST });

      const posts = await api.getPosts(category);

      dispatch({
        type: FETCH_POSTS_BY_CATEGORY_SUCCESS,
        category: category,
        posts: normalizeResponse(posts),
      });
    } catch (error) {
      dispatch({ type: FETCH_POSTS_BY_CATEGORY_FAILURE });
    }
  };
}

export function votePost(post, option) {
  return async function (dispatch) {
    try {
      dispatch({ type: VOTE_POST_SUCCESS, option: option, post: post });
      await api.votePost(post.id, option);
    } catch (error) {
      dispatch(addError(ObjectType.Post, ObjectAction.Vote, post));
      dispatch({ type: VOTE_POST_FAILURE, option: option, post: post });
    }
  };
}
