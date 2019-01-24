import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { getPostForm, getCommentForm, getErrorMessages, getPageState } from './store';
import PostListPage from './pages/PostList';
import PostDetailPage from './pages/PostDetail';
import ErrorList from './components/ErrorList';
import PostFormModal from './components/PostFormModal';
import CommentFormModal from './components/CommentFormModal';
import WaitingOverlay from './components/WaitingOverlay';

function mapStateToProps(state) {
  return {
    pageState: getPageState(state),
    errorMessages: getErrorMessages(state),
    postFormState: getPostForm(state),
    commentFormState: getCommentForm(state),
  };
}

function App(props) {
  const { postFormState, commentFormState, errorMessages, pageState } = props;

  return (
    <React.Fragment>
      <div className='App__Head'>
        <h1 className='App__Title'>
          <Link to='/'>Readable</Link>
        </h1>
      </div>

      <Switch>
        <Route path='/:categoryId?' exact component={PostListPage} />
        <Route path='/:categoryId/:postId' component={PostDetailPage} />
      </Switch>

      {errorMessages.length > 0 && (
        <ErrorList errors={errorMessages} />
      )}

      {pageState.isWaiting && (
        <WaitingOverlay />
      )}

      <PostFormModal
        isOpen={postFormState.isOpen}
        category={postFormState.category}
        post={postFormState.post}
      />

      <CommentFormModal
        isOpen={commentFormState.isOpen}
        parentId={commentFormState.parentId}
        comment={commentFormState.comment}
      />
    </React.Fragment>
  );
}

export default withRouter(connect(mapStateToProps)(App));
