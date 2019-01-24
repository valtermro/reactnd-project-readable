import './ErrorCard.css';
import React from 'react';
import PropTypes from 'prop-types';
import PostLink from './PostLink';
import CommentLink from './CommentLink';
import { ObjectAction, ObjectType } from '../constants';
import { FaTimes } from 'react-icons/fa';

function ErrorCard(props) {
  const { onCloseButtonClick, objectAction, objectType, object } = props;

  return (
    <div className='ErrorCard'>
      <div className='ErrorCard__Message'>
        {objectAction === ObjectAction.Delete ? (
          'Failed to delete'
        ) : objectAction === ObjectAction.Update ? (
          'Failed to update '
        ) : objectAction === ObjectAction.Vote ? (
          'Failed to vote'
        ) : objectAction === ObjectAction.Create ? (
          'Failed to create'
        ) : (
          ''
        )}

        {' '}

        {objectType === ObjectType.Post ? (
          object ? (
            <PostLink className='ErrorCard__ObjectLink' postId={object.id}>
              {object.title}
            </PostLink>
          ) : (
            'some really long post title asas bbb asas asas aaa asas assas asa asas asas bbbb'
            // 'the post'
          )
        ) : objectType === ObjectType.Comment ? (
          object ? (
            <CommentLink className='ErrorCard__ObjectLink' commentId={object.id}>
              this comment
            </CommentLink>
          ) : (
            'the comment'
          )
        ) : (
          ''
        )}
      </div>

      <button className='ErrorCard__CloseButton' onClick={onCloseButtonClick}>
        <FaTimes />
      </button>
    </div>
  );
}

ErrorCard.propTypes = {
  onCloseButtonClick: PropTypes.func.isRequired,
  objectAction: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired,

  // an object of `objectType` or null
  object: PropTypes.object,
};

export default ErrorCard;
