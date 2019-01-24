import { createStore as create, combineReducers } from 'redux';
import middleware from './middleware';
import posts, * as fromPosts from './reducers/posts';
import comments, * as fromComments from './reducers/comments';
import errors, * as fromErrors from './reducers/errors';
import categories, * as fromCategories from './reducers/categories';
import forms, * as fromForms from './reducers/forms';
import pageState, * as fromPageState from './reducers/pageState';

export function createStore() {
  return create(
    combineReducers({ errors, pageState, posts, comments, categories, forms }),
    middleware
  );
}

export function getPost(state, id) {
  return fromPosts.get(state, id);
}

export function getPosts(state, category) {
  return fromPosts.getByCategory(state, category);
}


export function getComment(state, id) {
  return fromComments.get(state, id);
}

export function getComments(state, postId) {
  return fromComments.getByPost(state, postId);
}


export function getCategory(state, id) {
  return fromCategories.get(state, id);
}

export function getCategories(state) {
  return fromCategories.getAll(state);
}


export function getLoadingState(state) {
  return {
    posts: fromPosts.getLoading(state),
    comments: fromComments.getLoading(state),
    categories: fromCategories.getLoading(state),
  };
}


export function getPostForm(state) {
  return fromForms.get(state, 'post');
}

export function getCommentForm(state) {
  return fromForms.get(state, 'comment');
}


export function getErrorMessages(state) {
  return fromErrors.getAll(state);
}


export function getPageState(state) {
  return fromPageState.getState(state);
}
