import './CommentForm.css';
import React from 'react';
import PropTypes from 'prop-types';

class CommentForm extends React.Component {
  static propTypes = {
    comment: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    author: this.props.comment ? this.props.comment.author : '',
    body: this.props.comment ? this.props.comment.body : '',
    authorError: '',
    bodyError: '',
  }

  onAuthorChange = (event) => {
    this.setState({ author: event.target.value, authorError: '' });
  }

  onBodyChange = (event) => {
    this.setState({ body: event.target.value, bodyError: '' });
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { author, body } = this.state;

    if (author && body) {
      return this.props.onSubmit({ author, body });
    }

    this.setState({
      authorError: !author ? 'This field is required' : '',
      bodyError: !body ? 'This field is required' : '',
    });
  }

  render = () => {
    const { author, body, authorError, bodyError } = this.state;
    const isForEditing = !!this.props.comment;

    return (
      <form className='form CommentForm' onSubmit={this.onSubmit}>
        <div
          className='form-group CommentForm__FormGroup'
          data-has-error={!!authorError}
        >
          <label htmlFor='author' className='form-label'>
            Author
          </label>
          <input id='author' type='text'
            className='form-input'
            disabled={isForEditing}
            placeholder='John Doe'
            value={author}
            onChange={this.onAuthorChange}
          />
          {authorError && ((
            <div className='form-error-message'>
              {authorError}
            </div>
          ))}
        </div>

        <div
          className='form-group full-width CommentForm__FormGroup'
          data-has-error={!!bodyError}
        >
          <label htmlFor='body' className='form-label'>
            Comment
          </label>
          <textarea id='body'
            className='form-input CommentForm__Text'
            value={body}
            onChange={this.onBodyChange}
          />
          {bodyError && ((
            <div className='form-error-message'>
              {bodyError}
            </div>
          ))}
        </div>

        <div className='form-foot'>
          <button type='button'
            className='form-cancel-button'
            onClick={this.onCancel}
          >
            Cancel
          </button>
          <button type='submit' className='form-submit-button'>
            Confirm
          </button>
        </div>
      </form>
    );
  }
}

export default CommentForm;
