import React,{useContext, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//importing the context that I created before in order to listen to user auth change
import {AuthContext} from '../../../src/Components/UserContext/AuthContext';
import firebase from '../../firebase/firebase';
import  {useHistory} from 'react-router-dom';

const NavbarComponent = () => {


    //adding state in order to display error message in case there is one
    const [error, setError] = useState(null);

    //using the context that we created before
    const user = useContext(AuthContext);

    const history = useHistory();

    //handling log out of a user
    const handleLogOut = () => {
      firebase.auth().signOut()
      .then(() =>{

          history.push("/");
      })
      .catch(error => {
        setError(error.message);
      })
    };


  return(
    <div className="navbar__container">

      <h2>{error && error}</h2>
       <Navbar collapseOnSelect expand="lg" bg="light" className="fixed-top" >
        <Navbar.Brand href="/" className="logo__text">𝕴𝖓𝖙𝖊𝖗𝖒𝖊𝖉𝖎𝖆𝖙𝖊</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/create">Create post</Nav.Link>

          </Nav>
          <Nav>

          { !user ? (
              <Nav.Link   href="/signup">Sign up</Nav.Link>
            ) : (
               <Nav.Link  onClick={handleLogOut}>logout</Nav.Link>
            )
          }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    )


};

export default NavbarComponent;
