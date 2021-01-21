import React, {useState, useEffect} from 'react';
//importing animations from react animation package
import {AnimateOnChange, HideUntilLoaded} from 'react-animation';

//creating the function that will handle the animations

const AnimationEffect = () => {
  //adding state in order to know on which word are we in
  const [current, setCurrent] = useState(0)

  const words = ['Live', 'Love', 'share', 'Shine'];

  useEffect(() => {

    const interval = setInterval(() => {

      if(current === words.length - 1) {
        setCurrent(0)
      } else {
        setCurrent(current + 1)
      }
    },1000);
     return (() => {
      clearInterval(interval)
    })

  })

    return (
    <div>
      <h1><AnimateOnChange animationOut="bounceOut" animationIn="bounceIn" durationOut="500">{words[current]}</AnimateOnChange></h1>
    </div>
  )
};


export default AnimationEffect;
