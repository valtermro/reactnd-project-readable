import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../store';

function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.postId),
  };
}

function PostLink(props) {
  const { className, post, children } = props;

  // NOTE: if "post" is not set it's still loading, just wait for it...
  return !post ? null : (
    <Link to={`/${post.category}/${post.id}`} className={className}>
      {children}
    </Link>
  );
}

PostLink.propTypes = {
  className: PropTypes.string,
  postId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PostLink);
