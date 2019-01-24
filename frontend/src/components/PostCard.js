import './PostCard.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { formatDate } from '../lib/util';
import ControlMenu from './ControlMenu';
import VoteMenu from './VoteMenu';
import PostLink from './PostLink';

function PostCard(props) {
  const {
    post, category,
    onEditButtonClick, onDeleteButtonClick,
    onUpVoteButtonClick, onDownVoteButtonClick,
  } = props;

  return (
    <div className='PostCard'>
      <div className='PostCard__Head'>
        <Link
          className='underlined-button PostCard__CategoryLink'
          to={`/${category.id}`}
        >
          {category.name}
        </Link>

        <ControlMenu
          onEditButtonClick={onEditButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </div>

      <div className='PostCard__Body'>
        <h3 className='PostCard__PostTitle'>
          <PostLink
            className='PostCard__PostLink'
            postId={post.id}
          >
            {post.title}
          </PostLink>
        </h3>
        <p className='PostCard__PostMeta'>
          by <span className='PostCard__PostAuthor'>
            {post.author}
          </span> on {formatDate(post.timestamp)}
        </p>
      </div>

      <div className='PostCard__Foot'>
        <div className='PostCard__CommentCount'>
          <FaComments className='PostCard__CommentIcon' /> {post.commentCount}
        </div>

        <VoteMenu
          score={post.voteScore}
          onUpVoteButtonClick={onUpVoteButtonClick}
          onDownVoteButtonClick={onDownVoteButtonClick}
        />
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onUpVoteButtonClick: PropTypes.func.isRequired,
  onDownVoteButtonClick: PropTypes.func.isRequired,
};

export default PostCard;
