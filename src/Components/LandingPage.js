import React, {useState, useEffect} from 'react';
import './LandingPage.css';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';
import AnimationEffect from './UI/Animation';
import LoadingSpinner from './UI/Loading';



const LandingPage = () => {

  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchPopularPosts = async () => {

      let postsBack = [];

      setLoading(true);
      await firebase.firestore()
        .collection('posts')
        .where("likes", ">=", 5)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            postsBack.push({ id: doc.id, ...doc.data() })
          })
          setPopular(postsBack);
        })
        .catch(error => setError(error.message))

        setLoading(false);
    };

    //calling the function
    fetchPopularPosts();

  }, []);

  if (loading) return <LoadingSpinner/>

  return (
    <>
    <div className="landing__page">
    {error && error}

    <div className="landing__text">
      <AnimationEffect/>
    </div>

    </div>

     <div className="landingPage__banner">
        <h2>Our Most Popular Posts </h2>
     </div>

    <div className="landingPage__cards">

      {popular.map(post => {
        return <CardComponent data={post} key={post.id}/>
      })}
    </div>



    </>


  );
}

export default LandingPage;
