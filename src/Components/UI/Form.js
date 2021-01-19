import React,{useState, useContext} from 'react';
import {AuthContext} from '../UserContext/AuthContext';
import { storage }  from '../../../src/firebase/firebase';
import firebase  from '../../../src/firebase/firebase';

const Form = ({action,editData, match, history}) => {

  //adding the state that will be independent
  const [details, setDetails] = useState({
    title: '',
    content: '',
    likes: 0
  });

  const [category, setCategory] = useState({value: ''});

  //adding state in order to upload an img
  const [file, setFile] = useState("");
  const [url, setURL] = useState("");

  //adding error handler
  const [error, setError] = useState(null); // not sure if this will work

  //user context
  const user = useContext(AuthContext);


  //global variables
  const {title, content, likes} = details;
  const {value} = category;



  const handleChange = (e) => {
      //working mwith multiple inputs
    let name = e.target.name
    let value = e.target.value;

    setDetails(prevValues => {
      return {
        ...prevValues,
        [name]: value
      }
    });

  };


  //function to get the img the user wnats to upload
 const handleImgUpload = e =>  setFile(e.target.files[0]);


  //creating function in order to create in storaga firestore the images folder
  const handleFirebaseUpload = () => {

    //starting the upload process and also creating the path /images in firestore
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    //refactoring
    uploadTask.on('state_changed', () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
      })

    },(err) => {
      setError(err.message);
    })

  };

const handleCategory = e => setCategory({value: e.target.value});

const createPost = async (e) => {

  if(user && url) {

    await firebase.firestore().collection('posts')
      .add({
        title,
        likes,
        content,
        value,
        imgUrl: url,
        currentUser: user.uid,

      })
      .then(() => {
        history.push("/")
      })
      .catch(error => setError(error.message))

  }

   handleFirebaseUpload();

};


  const updatePost = async (e) => {

    await firebase.firestore()
      .collection('posts')
      .doc(match)
      .update({
        title,
        content,
        value
      })
      .then(() => {
        history.push("/")
      })
      .catch(error => setError(error.message))

  };

  //auxiliar function

  const auxiliar = (e) => {

    e.preventDefault();

    if (action === 'create') {
      createPost();
    } else {
      updatePost();
    }
  };


  return(
    <>

       <form onSubmit={auxiliar}>

        {error && error}

         <div className="form_control">

          <label>{editData && editData.title ? editData.title : "Title"}</label>

            <input type="text"
             className="form-control"
             placeholder="Enter title"
             name="title"
             onChange={handleChange}

            value={title}
             required
             />

         </div>

             <label>{editData && editData.content ?  editData.content : "Content"}</label>

          <div className="form-group">
            <textarea
             name="content"
             cols="40"
             rows="6"
             onChange={handleChange}
             value={content}
             placeholder="Write your history"
             required
             />

          </div>
            {action === 'create' ? (<input
              type="file"
              onChange={handleImgUpload}
              required
            />):  null}


           <select  onChange={handleCategory} required>
            <option  value="News">News</option>
            <option  value="Travel">Travel</option>
            <option  value="Health">Health</option>
            <option value="Tech">Tech</option>
          </select>

          <button type="submit"  className="btn_create">{action === 'create' ? 'Create Post' : 'Update Post'}</button>


        </form>

      </>
  )
}


export default Form;
