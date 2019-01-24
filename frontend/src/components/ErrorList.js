import './ErrorList.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorCard from './ErrorCard';
import { removeError } from '../store/actions/errors';

class ErrorList extends React.Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
  }

  closeMessage = (error) => {
    this.props.dispatch(removeError(error));
  }

  render = () => {
    const { errors } = this.props;

    return (
      <div className='ErrorList'>
        {errors.map((error) => (
          <ErrorCard
            key={error.id}
            objectAction={error.objectAction}
            objectType={error.objectType}
            object={error.object}
            onCloseButtonClick={() => this.closeMessage(error)}
          />
        ))}
      </div>
    );
  }
}

export default connect()(ErrorList);
