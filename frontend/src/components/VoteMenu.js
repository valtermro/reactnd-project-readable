import './VoteMenu.css';
import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function VoteMenu(props) {
  const { score, onUpVoteButtonClick, onDownVoteButtonClick } = props;

  return (
    <div className='VoteMenu'>
      <button type='button'
        className='VoteMenu__UpVoteButton'
        onClick={onUpVoteButtonClick}
      >
        <FaThumbsUp className='VoteMenu__UpVoteIcon' />
      </button>

      <button type='button'
        className='VoteMenu__DownVoteButton'
        onClick={onDownVoteButtonClick}
      >
        <FaThumbsDown className='VoteMenu__DownVoteIcon' />
      </button>

      <span className={`VoteMenu__Score ${score < 0 ? 'negative' : 'positive'}`}>
        {score}
      </span>
    </div>
  );
}

VoteMenu.propTypes = {
  score: PropTypes.number.isRequired,
  onUpVoteButtonClick: PropTypes.func.isRequired,
  onDownVoteButtonClick: PropTypes.func.isRequired,
};

export default VoteMenu;
