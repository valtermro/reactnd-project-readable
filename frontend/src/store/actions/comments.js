import * as api from '../../lib/api';
import { normalizeResponse } from '../../lib/util';
import { addError } from './errors';
import { closeCommentForm } from './forms';
import { startWaiting, stopWaiting }  from './pageState';
import { ObjectType, ObjectAction } from '../../constants';

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';

export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE';

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export function createComment(postId, data) {
  return async function (dispatch) {
    dispatch(startWaiting());

    try {
      const comment = await api.createComment(postId, data);

      dispatch({ type: CREATE_COMMENT_SUCCESS, comment: comment });
      dispatch(closeCommentForm());
    } catch (error) {
      dispatch(addError(ObjectType.Comment, ObjectAction.Create, null));
    } finally {
      dispatch(stopWaiting());
    }
  };
}

export function fetchComments(postId) {
  return async function (dispatch) {
    dispatch({ type: FETCH_COMMENTS_REQUEST });

    try {
      const comments = await api.getComments(postId);

      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        postId: postId,
        comments: normalizeResponse(comments),
      });
    } catch (error) {
      dispatch({ type: FETCH_COMMENTS_FAILURE });
    }
  };
}

export function updateComment(comment, data) {
  return async function (dispatch) {
    dispatch(startWaiting());

    try {
      const updatedComment = await api.updateComment(comment.id, data);

      dispatch({ type: UPDATE_COMMENT_SUCCESS, comment: updatedComment });
      dispatch(closeCommentForm());
    } catch (error) {
      dispatch(addError(ObjectType.Comment, ObjectAction.Update, comment));
    } finally {
      dispatch(stopWaiting());
    }
  };
}

export function deleteComment(comment) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_COMMENT_SUCCESS, comment: comment });
      await api.deleteComment(comment.id);
    } catch (error) {
      dispatch(addError(ObjectType.Comment, ObjectAction.Delete, comment));
      dispatch({ type: DELETE_COMMENT_FAILURE, comment: comment });
    }
  };
}

export function voteComment(comment, option) {
  return async function (dispatch) {
    try {
      dispatch({ type: VOTE_COMMENT_SUCCESS, option: option, comment: comment });
      await api.voteComment(comment.id, option);
    } catch (error) {
      dispatch(addError(ObjectType.Comment, ObjectAction.Vote, comment));
      dispatch({ type: VOTE_COMMENT_FAILURE, option: option, comment: comment });
    }
  };
}
