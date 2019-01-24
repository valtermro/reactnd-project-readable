import './CommentList.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openCommentForm } from '../store/actions/forms';
import { voteComment, deleteComment } from '../store/actions/comments';
import CommentCard from './CommentCard';

class CommentList extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  }

  deleteComment = (comment) => {
    this.props.dispatch(deleteComment(comment));
  }

  openCommentForm = (comment) => {
    this.props.dispatch(openCommentForm(comment.parentId, comment));
  }

  voteComment = (comment, option) => {
    this.props.dispatch(voteComment(comment, option));
  }

  render = () => {
    // Older comments come first
    const comments = this.props.comments.slice(0).sort((a, b) => a.timestamp - b.timestamp);

    return (
      <div className='CommentList'>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onEditButtonClick={() => this.openCommentForm(comment)}
            onDeleteButtonClick={() => this.deleteComment(comment)}
            onUpVoteButtonClick={() => this.voteComment(comment, 'up')}
            onDownVoteButtonClick={() => this.voteComment(comment, 'down')}
          />
        ))}
      </div>
    );
  }
}

export default connect()(CommentList);
