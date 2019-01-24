import './PostList.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { votePost, deletePost } from '../store/actions/posts';
import PostCard from './PostCard';
import { openPostForm } from '../store/actions/forms';

class PostList extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
  }

  votePost = (post, option) => {
    this.props.dispatch(votePost(post, option));
  }

  deletePost = (post) => {
    this.props.dispatch(deletePost(post, true));
  }

  openPostForm = (post) => {
    this.props.dispatch(openPostForm(null, post));
  }

  render() {
    const { posts, categories } = this.props;

    return (
      <div className='PostList'>
        {posts.length === 0 ? (
          <div className='PostList__Empty'>
            Nothing to see here
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              category={categories.find(c => c.id === post.category)}
              onEditButtonClick={() => this.openPostForm(post)}
              onDeleteButtonClick={() => this.deletePost(post)}
              onUpVoteButtonClick={() => this.votePost(post, 'up')}
              onDownVoteButtonClick={() => this.votePost(post, 'down')}
            />
          ))
        )}
      </div>
    );
  }
}

export default connect()(PostList);
