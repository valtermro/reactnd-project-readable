import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { getComment, getPost } from '../store';

// NOTE: This component requires both the comment and it's parent post loaded into
// the state tree. Right now, this component is only used to build a comment link
// in an error message which is only created after an action involving a given
// comment fails. At that time, both post and comment are also expected to be in
// the state tree, (there wouldn't be an action being performed in a comment if
// that comment is not available...) so we should be good.

function mapStateToProps(state, props) {
  const comment = getComment(state, props.commentId);
  const post = comment && getPost(state, comment.parentId);

  return {
    commentId: comment && comment.id,
    postId: post && post.id,
    postCategory: post && getPost(state, comment.parentId).category,
  };
}

function CommentLink(props) {
  const {
    className,children,
    commentId, postId, postCategory,
  } = props;

  return (
    <HashLink
      className={className}
      to={`/${postCategory}/${postId}#${commentId}`}
    >
      {children}
    </HashLink>
  );
}

CommentLink.propTypes = {
  className: PropTypes.string,
  commentId: PropTypes.string,
};

export default connect(mapStateToProps)(CommentLink);
