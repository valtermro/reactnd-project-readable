import './CommentCard.css';
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../lib/util';
import ControlMenu from './ControlMenu';
import VoteMenu from './VoteMenu';

function CommentCard(props) {
  const {
    comment,
    onEditButtonClick, onDeleteButtonClick,
    onUpVoteButtonClick, onDownVoteButtonClick,
  } = props;

  return (
    <div className='CommentCard' id={comment.id}>
      <div className='CommentCard__Head'>
        <div>
          <span className='CommentCard__Author'>
            {comment.author}
          </span> said on {formatDate(comment.timestamp)}
        </div>

        <ControlMenu
          onEditButtonClick={onEditButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </div>

      <div className='CommentCard__Body'>
        {comment.body}
      </div>

      <div className='CommentCard__Foot'>
        <VoteMenu
          score={comment.voteScore}
          onUpVoteButtonClick={onUpVoteButtonClick}
          onDownVoteButtonClick={onDownVoteButtonClick}
        />
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onUpVoteButtonClick: PropTypes.func.isRequired,
  onDownVoteButtonClick: PropTypes.func.isRequired,
};

export default CommentCard;
