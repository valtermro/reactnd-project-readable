import './Loading.css';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function LoadingPage() {
  return (
    <div className='LoadingPage'>
      <FaSpinner className='LoadingPage__Icon' />
    </div>
  );
}

export default LoadingPage;
