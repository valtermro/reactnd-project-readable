import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { closeCommentForm } from '../store/actions/forms';
import CommentForm from '../components/CommentForm';
import { createComment, updateComment } from '../store/actions/comments';

class CommentModalForm extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    parentId: PropTypes.string.isRequired,
    comment: PropTypes.object,
  }

  onSubmit = (data) => {
    if (this.props.comment) {
      this.props.dispatch(updateComment(this.props.comment, data));
    } else {
      this.props.dispatch(createComment(this.props.parentId, data));
    }
  }

  onCancel = () => {
    this.props.dispatch(closeCommentForm());
  }

  render = () => {
    const { isOpen, parentId, comment } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        overlayClassName='FormModal'
        className='FormModal__Content'
      >
        <CommentForm
          parentId={parentId}
          comment={comment}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </Modal>
    );
  }
}

export default connect()(CommentModalForm);
