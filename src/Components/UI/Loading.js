import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner = () => {
  return(
    <div style={{ display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '100px'}}>
    <Spinner animation="grow" />
    </div>
  )
}

export default LoadingSpinner;
