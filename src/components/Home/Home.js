import React, { useEffect, useState } from 'react';
import AllEvents from '../AllEvents/AllEvents';

const Home = () => {
    const [allEvents, setAllEvents] = useState([]);
    useEffect(() => {
          fetch('http://localhost:4005/events')
          .then(res => res.json())
          .then(data => {
              setAllEvents(data)
          })  
    }, [])
    return (     
        <div>
           {
               allEvents.map(allEvent => <AllEvents key={allEvent._id} allEvent={allEvent}></AllEvents> )
           }
        </div>
    );
};

export default Home;