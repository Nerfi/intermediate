import React, {useState} from 'react';
import './SignUp.css';
import firebase from '../firebase/firebase';
import {Link } from 'react-router-dom';


const Signup = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: ''
  });

  //adding error handling state
  const [error, setError] = useState(null);


  //Global variables
  const {email, password, username} = credentials;

  //handling changes in inputs

  const handleChange = (e) => {

    let name = e.target.name;
    let value = e.target.value;

    //updating the state and listening to changes on input files
    setCredentials(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      }
    });
  };



  //creating user with email and password, this is an asyn action
  const handleSubmit = async  (e) => {
    //preventing default behavior of forms
    e.preventDefault();

    //making the request
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        //testing if we can display the name when user sign up on the app
        if(result) {
           result.user.updateProfile({
                displayName: username
            })
        }


        //creating a user collection in order to store the users on it
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
          email
          //maybe add later the username here
        })
     })
     .catch(function(error) {

    const errorMessage = error.message;
  // updating state if error
    setError(errorMessage);
  });



  };


  return <div className="signup__container">

    <div className="signup__form">

     <h2>Sign Up!</h2>

     {error && error}

    <form onSubmit={handleSubmit}>

    <label> User name </label>
    <div className="form_control">

      <input
      type="text"
      name="username"
      placeholder="username"
      onChange={handleChange}
      required
      />

    </div>


      <label> Email </label>
      <div className="form_control">

        <input
        type="email"
         name="email"
         placeholder="enter your email"
         value={email}
         onChange={handleChange}
         required
         autoComplete="true"
         />

      </div>

      <label>Password</label>

      <div className="form_control">

        <input
       type="password"
        name="password"
        value={password}
        placeholder="enter your passsword"
        autoComplete="off"
        onChange={handleChange}
        required
        />

      </div>


      <button type="submit" className="btn_create">Sign Up!</button>

    </form>

    <p>already have an account ? <Link to="SignIn" >Sign In !</Link> </p>



    </div>
  </div>
}

export default Signup;
