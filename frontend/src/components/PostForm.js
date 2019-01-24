import './PostForm.css';
import React from 'react';
import PropTypes from 'prop-types';

class PostForm extends React.Component {
  static propTypes = {
    categoryOptions: PropTypes.array.isRequired,
    post: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    category: this.props.post ? this.props.post.category : '',
    author: this.props.post ? this.props.post.author : '',
    title: this.props.post ? this.props.post.title : '',
    body: this.props.post ? this.props.post.body : '',
    categoryError: '',
    authorError: '',
    titleError: '',
    bodyError: '',
  }

  onCategoryChange = (event) => {
    this.setState({ category: event.target.value, categoryError: '' });
  }

  onAuthorChange = (event) => {
    this.setState({ author: event.target.value, authorError: '' });
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value, titleError: '' });
  }

  onBodyChange = (event) => {
    this.setState({ body: event.target.value, bodyError: '' });
  }

  onCancel = () => {
    // NOTE: The parent component should unmount the form so no need for cleanup here
    this.props.onCancel();
  }

  onSubmit = async (event) => {
    const { category, author, title, body } = this.state;
    event.preventDefault();

    const errors = {};

    ['category', 'author', 'title', 'body'].forEach((field) => {
      if (!this.state[field]) {
        errors[`${field}Error`] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      return this.setState(errors);
    }

    this.props.onSubmit({ category, author, title, body });
  }

  render = () => {
    const { categoryOptions, post} = this.props;
    const {
      category, author, title, body,
      categoryError, authorError, titleError, bodyError,
    } = this.state;

    const isForEditing = !!post;

    return (
      <form className='form PostForm' onSubmit={this.onSubmit}>
        <div
          className='form-group PostForm__FormGroup'
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
          {authorError && (
            <div className='form-error-message'>
              {authorError}
            </div>
          )}
        </div>

        <div
          className='form-group PostForm__FormGroup'
          data-has-error={!!categoryError}
        >
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <select id='category'
            className='form-input'
            disabled={isForEditing}
            value={category}
            onChange={this.onCategoryChange}
          >
            <option value=''>
              Select
            </option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {categoryError && (
            <div className='form-error-message'>
              {categoryError}
            </div>
          )}
        </div>

        <div
          className='form-group full-width PostForm__FormGroup'
          data-has-error={!!titleError}
        >
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input id='title' type='text'
            className='form-input'
            value={title}
            onChange={this.onTitleChange}
          />
          {titleError && (
            <div className='form-error-message'>
              {titleError}
            </div>
          )}
        </div>

        <div
          className='form-group full-width PostForm__FormGroup'
          data-has-error={!!bodyError}
        >
          <label htmlFor='post' className='form-label'>
            Post
          </label>
          <textarea id='post'
            className='form-input PostForm__FormText'
            value={body}
            onChange={this.onBodyChange}
          />
          {bodyError && (
            <div className='form-error-message'>
              {bodyError}
            </div>
          )}
        </div>

        <div className='form-foot full-width'>
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

export default PostForm;
