import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { getCategories } from '../store';
import { closePostForm } from '../store/actions/forms';
import PostForm from '../components/PostForm';
import { createPost, updatePost } from '../store/actions/posts';

function mapStateToProps(state) {
  return {
    // NOTE: This is either an array with all categories or an empty array.
    // - It MUST be the full list if the form is being used to create a new post.
    // - It CAN be an empty array if the form is being used to edit a post. The
    //   category list is just ignored in that case.
    // It's up to the page components to handle the data fetching to make sure
    // the store has the correct state at the time this component is used.
    allCategories: getCategories(state),
  };
}

class PostFormModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    post: PropTypes.object,
  }

  onSubmit = (data) => {
    if (this.props.post) {
      this.props.dispatch(updatePost(this.props.post, data));
    } else {
      this.props.dispatch(createPost(data));
    }
  }

  onCancel = () => {
    this.props.dispatch(closePostForm());
  }

  render = () => {
    const { isOpen, allCategories, post } = this.props;

    const categoryOptions = allCategories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    return (
      <Modal
        isOpen={isOpen}
        overlayClassName='FormModal'
        className='FormModal__Content'
      >
        <PostForm
          post={post}
          categoryOptions={categoryOptions}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(PostFormModal);
