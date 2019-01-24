import './PostDisplay.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/util';
import ControlMenu from './ControlMenu';
import VoteMenu from './VoteMenu';

function PostDisplay(props) {
  const {
    post, category,
    onEditButtonClick, onDeleteButtonClick,
    onUpVoteButtonClick, onDownVoteButtonClick,
  } = props;

  return (
    <div className='PostDisplay'>
      <div className='PostDisplay__Topbar'>
        <Link
          to={`/${category.id}`}
          className='underlined-button PostDisplay__PostCategoryLink'
        >
          {category.name}
        </Link>
        <ControlMenu
          onEditButtonClick={onEditButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </div>

      <h2 className='PostDisplay__PostTitle'>
        {post.title}
      </h2>

      <div className='PostDisplay__PostMeta'>
        by <span className='PostDisplay__PostAuthor'>
          {post.author}
        </span> on {formatDate(post.timestamp)}
      </div>

      <div className='PostDisplay__PostBody'>
        {post.body}
      </div>

      <div className='PostDisplay__Foot'>
        <VoteMenu
          score={post.voteScore}
          onUpVoteButtonClick={onUpVoteButtonClick}
          onDownVoteButtonClick={onDownVoteButtonClick}
        />
      </div>
    </div>
  );
}

PostDisplay.propTypes = {
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onUpVoteButtonClick: PropTypes.func.isRequired,
  onDownVoteButtonClick: PropTypes.func.isRequired,
};

export default PostDisplay;
