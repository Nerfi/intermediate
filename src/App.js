import React from 'react';
import './App.css';
import NavbarComponent from './Components/UI/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";
import Posts from './Components/Posts';
import CreatePost from './Components/CreatePost';
import Signup from '../Auth/Signup';
import SignIn from '../Auth/SignIn';
import SinglePost from './Components/SinglePost';
import EditPost from './Components/EditPost';
//importing the context in order to listen when the user auth state changes
import {AuthProvider} from './src/Components/UserContext/AuthContext';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>

        <AuthProvider>

         <NavbarComponent/>

          <Route path="/post/:id"  component={SinglePost} />
          <Route path="/edit/post/:id"  component={EditPost} />
          <Route path="/posts"  component={Posts} />
          <Route path="/create"  component={CreatePost} />
          <Route path="/signup"  component={Signup} />
          <Route path="/signIn"  component={SignIn} />

         <Route path="/" exact component={LandingPage} />
        </AuthProvider>



        </Switch>
      </Router>


    </div>
  );
}

export default App;
