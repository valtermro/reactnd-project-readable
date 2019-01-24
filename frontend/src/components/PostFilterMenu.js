import './PostFilterMenu.css';
import React from 'react';
import PropTypes from 'prop-types';

function PostFilterMenu(props) {
  const {
    className,
    currentSearchText, onSearchTextChange,
    categoryOptions, currentCategory, onCategoryChange,
    sortTypeOptions, currentSortType, onSortTypeChange,
  } = props;

  return (
    <div className={`PostFilterMenu ${className || ''}`.trim()}>
      <h2 className='visually-hidden'>
        Filter the posts list
      </h2>

      <div className='PostFilterMenu__Group'>
        <span className='PostFilterMenu__Label'>
          Category:
        </span>
        <select
          className='PostFilterMenu__Input'
          value={currentCategory}
          onChange={event => onCategoryChange(event.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className='PostFilterMenu__Group'>
        <span className='PostFilterMenu__Label'>
          Sort:
        </span>

        <select
          className='PostFilterMenu__Input'
          value={currentSortType}
          onChange={event => onSortTypeChange(event.target.value)}
        >
          {sortTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className='PostFilterMenu__Group'>
        <label htmlFor='filter' className='PostFilterMenu__Label'>
          Filter:
        </label>
        <input id='filter' type='text'
          placeholder='post title'
          className='PostFilterMenu__Input'
          value={currentSearchText}
          onChange={event => onSearchTextChange(event.target.value)}
        />
      </div>
    </div>
  );
}

PostFilterMenu.propTypes = {
  className: PropTypes.string,

  categoryOptions: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,

  sortTypeOptions: PropTypes.array.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,

  currentSearchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
};

export default PostFilterMenu;
