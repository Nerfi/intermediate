import React from 'react';
import './CreatePost.css';
import Form from './UI/Form';

const CreatePost = ({history}) => {


  return(
    <>

    <div className="banner">
      <h2>Share with us your history !</h2>
    </div>

    <div className="create__form">

       <Form
        history={history}
        action='create'

       />

    </div>

    </>


  );
}

export default CreatePost;

