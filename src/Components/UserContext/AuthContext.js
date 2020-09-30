import React, {useState, useEffect} from 'react';
import firebase from '../../../src/firebase/firebase';

//1- we create the context hook
const AuthContext = React.createContext();

/*
  we create a fucntion that Will handle the changes on the state, in this
  case  we will listen to when the Auth state changes in the user, it might be
  sign in, login out sign up,HOC
*/

  const AuthProvider = (props) => {

  const [currentUser , setCurrentUser] = useState({});

  useEffect(() => {

        //onauthStatechange is a hook that will listen whenever the user is logged in or logged out  in the app just that
      firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);

      });


  },[currentUser]);

    /* every context object has a provider , the mission of this provider is to
    PROVIDE the value that we pass in as a defualt value , that way all the components
    around this HOC will be able to use this state
    */

  return(
    <AuthContext.Provider value={currentUser}>
      {props.children}
    </AuthContext.Provider>
  )

};


export {
  AuthContext, AuthProvider
};
