import './ControlMenu.css';
import React from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisH } from 'react-icons/fa';
import { isChildOf } from '../lib/dom';

class ControlMenu extends React.Component {
  static propTypes = {
    onEditButtonClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
  }

  buttonWrapperRef = React.createRef()

  state = {
    isOpen: false,
  }

  open = () => {
    if (this.state.isOpen) {
      return;
    }

    this.setState({ isOpen: true }, () => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keyup', this.onDocumentKeyup);
      this.buttonWrapperRef.current.focus();
    });
  }

  close = () => {
    this.setState({ isOpen: false }, () => {
      document.removeEventListener('click', this.onDocumentClick);
      document.removeEventListener('keyup', this.onDocumentKeyup);
    });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.open();
    }
  }

  onDocumentKeyup = (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    if (!isChildOf(this.buttonWrapperRef.current, event.target)) {
      this.close();
    }
  }

  onDocumentClick = (event) => {
    if (!isChildOf(this.buttonWrapperRef.current, event.target)) {
      this.close();
    }

  }

  onEditButtonClick = () => {
    this.props.onEditButtonClick();
    this.close();
  }

  onDeleteButtonClick = () => {
    if (window.confirm('Delete this item?')) {
      this.props.onDeleteButtonClick();
    }
    this.close();
  }

  render = () => {
    const { isOpen } = this.state;

    return (
      <div
        tabIndex='0'
        className='ControlMenu'
        onClick={this.open}
        onKeyPress={this.onKeyPress}
      >
        <FaEllipsisH className='ControlMenu__Icon' />

        {isOpen && (
          <div tabIndex='-1'
            ref={this.buttonWrapperRef}
            className='ControlMenu__Buttons'
          >
            <button type='button'
              className='ControlMenu__EditButton'
              onClick={this.onEditButtonClick}
            >
              Edit
            </button>
            <button type='button'
              className='ControlMenu__DeleteButton'
              onClick={this.onDeleteButtonClick}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ControlMenu;
