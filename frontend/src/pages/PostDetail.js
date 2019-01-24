import './PostDetail.css';
import React from 'react';
import { connect } from 'react-redux';
import { getLoadingState, getPost, getComments, getCategory } from '../store';
import { openPostForm, openCommentForm } from '../store/actions/forms';
import { fetchPost, deletePost, votePost } from '../store/actions/posts';
import { fetchCategory } from '../store/actions/categories';
import { fetchComments } from '../store/actions/comments';
import LoadingPage from './Loading';
import NotFoundPage from './NotFound';
import InternalErrorPage from './InternalError';
import PostDisplay from '../components/PostDisplay';
import CommentList from '../components/CommentList';
import InternalErrorMessage from '../components/InternalErrorMessage';

function mapStateToProps(state, props) {
  const loadingState = getLoadingState(state);
  const { postId } = props.match.params;
  const post = getPost(state, postId);

  return {
    post: post,
    category: post && getCategory(state, post.category),
    comments: post && getComments(state, post.id),

    isLoadingPost: loadingState.posts.loading,
    failedToLoadPost: loadingState.posts.failed,

    isLoadingCategory: loadingState.categories.loading,
    failedToLoadCategory: loadingState.categories.failed,

    isLoadingComments: loadingState.comments.loading,
    failedToLoadComments: loadingState.comments.failed,
  };
}

class PostDetailPage extends React.Component {
  componentDidMount = () => {
    const { postId, categoryId } = this.props.match.params;

    this.props.dispatch(fetchPost(postId));
    this.props.dispatch(fetchCategory(categoryId));
    this.props.dispatch(fetchComments(postId));
  }

  votePost = (option) => {
    this.props.dispatch(votePost(this.props.post, option));
  }

  openPostForm = () => {
    this.props.dispatch(openPostForm(null, this.props.post));
  }

  deletePost = async () => {
    if (await this.props.dispatch(deletePost(this.props.post, false))) {
      this.props.history.push('/');
    }
  }

  openCommentForm = () => {
    this.props.dispatch(openCommentForm(this.props.post.id));
  }

  render = () => {
    const {
      post, category, comments,
      isLoadingPost, isLoadingCategory, isLoadingComments,
      failedToLoadPost, failedToLoadCategory, failedToLoadComments,
    } = this.props;

    if (failedToLoadPost || failedToLoadCategory) {
      return <InternalErrorPage />;
    }

    if (!post && !isLoadingPost) {
      return <NotFoundPage />;
    }

    if (isLoadingPost || isLoadingCategory) {
      return <LoadingPage />;
    }

    return (
      <div className='page-container PostDetailPage'>
        <PostDisplay
          location={this.props.location}
          post={post}
          category={category}
          onEditButtonClick={this.openPostForm}
          onDeleteButtonClick={this.deletePost}
          onUpVoteButtonClick={() => this.votePost('up')}
          onDownVoteButtonClick={() => this.votePost('down')}
        />

        <h3 className='PostDetailPage__CommentCount'>
          Comments ({post.commentCount})
        </h3>

        <button type='button'
          className='underlined-button PostDetailPage__CreateCommentButton'
          onClick={this.openCommentForm}
        >
          Write a comment
        </button>

        {post.commentCount > 0 && (
          <div className='PostDetailPage__Comments'>
            {failedToLoadComments ? (
              <InternalErrorMessage />
            ) : isLoadingComments && comments.length === 0 ? (
              <div>
                Loading...
              </div>
            ) : (
              <CommentList comments={comments} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(PostDetailPage);
