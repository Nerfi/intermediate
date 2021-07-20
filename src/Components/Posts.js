import React, {useState,useEffect} from 'react';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';
import './Posts.css';
import {Nav} from 'react-bootstrap';

 const Posts = (props) => {

  const [posts, setPosts] = useState([]);
  const [selectCategory, setSelected] = useState("");
  const [retrieveData, setRetrieve] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchPosts = async () => {

       await firebase.firestore().collection("posts")

        .get().then((snapShot) => {

          const newArray = [];

          snapShot.forEach((doc) => {
            newArray.push({ id: doc.id, ...doc.data() })
          })

          setPosts(newArray);
        })
    };

    //calling the function, always call it !
    fetchPosts();

  },[]);


useEffect(() => {

    const fetchPopularPosts = async () => {

      let postsBack = [];

      await firebase.firestore()
        .collection('posts')
        .where("value", "==",selectCategory)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            postsBack.push({ id: doc.id, ...doc.data() })
          })
          setRetrieve(postsBack);
        })
        .catch(error => setError(error.message))
    };

    //calling the function
    fetchPopularPosts();

  }, [selectCategory]);

  let card = (
          posts.map(posts => {
          return <CardComponent data={posts} key={posts.id} />
        })
);

if(retrieveData.length > 0) {
   card = retrieveData.map(posts => {
    return <CardComponent key={posts.id} data={posts}/>
   })
}



  return <>
  {error && error}

    <div className="posts__category">

      <Nav className="justify-content-center"   onSelect={(eventKey) => setSelected(eventKey)} >
        <Nav.Item >
          <Nav.Link  eventKey="Tech" >Tech</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="News">News</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link  eventKey="Health">Health</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="Travel" >
            Travel
          </Nav.Link>
        </Nav.Item>
   </Nav>

    </div>
    <div className="posts__container">

      {card}
    </div>

  </>
 };


 export default Posts;
