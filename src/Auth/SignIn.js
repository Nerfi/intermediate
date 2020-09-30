import React, {useState} from 'react';
import './SignIn.css';
import firebase from  '../firebase/firebase';

const SignIn = ({history}) => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  //setting up error state
  const [error, setError] = useState(null);
    //global variables
  const {email, password} = credentials;

  //onchange handler
  const handleChange = (e) => {
    //targeting user inputs for email and password
    let name = e.target.name;
    let value = e.target.value;

    //updating state with user inputs
    setCredentials(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      }
    });


  };

  //onSubmit handler, sign in user with email and password methods from firebase
  const handleSubmit = async (e) => {

    e.preventDefault();

    //firebase methods
   await firebase.auth().signInWithEmailAndPassword(email, password)
   .then(userSignin => {
      history.replace("/");
   })
    .catch(function(error) {
      const Message = error.message;
      setError(Message)
    });

  }

  return <div className="signIn__container">

    <form onSubmit={handleSubmit} className="signIn__form">

      <h2>
        SignIn !
      </h2>
      {error && error}

      <label>Email</label>

      <div className="input__email">
        <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter you email"
        autoComplete
        onChange={handleChange}
        />

      </div>

      <label> Password</label>

      <div className="input__password">
        <input
         type="password"
         name="password"
         value={password}
         autoComplete="off"
         placeholder="Enter your password"
         onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn__signin">Submit</button>


    </form>
  </div>
};

export default SignIn;
