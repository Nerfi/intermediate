import React, {useState, useEffect} from  'react';
import firebase from '../firebase/firebase';
import Form from './UI/Form';
import './EditPost.css';

const EditPost = (props) => {

  const [editPost, setEdit] = useState({});
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchEditPost = async () => {

      await firebase.firestore().collection('posts')
            .doc(props.match.params.id)
            .get()
            .then(result => setEdit(result.data()))
            .catch(err => setError(err.message))

    };

    //calling the function
    fetchEditPost();

  },[]);


  return <div className="editPost__container">
      {error && error}

    <Form
      action='edit'
      editData={editPost}
      match={props.match.params.id}
      history={props.history}
    />


  </div>
};

export default EditPost;

