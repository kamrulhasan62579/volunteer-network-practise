import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Events = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [mongoData, setMongoData] = useState([]);
    console.log(mongoData);

    useEffect(() => {
        fetch(`http://localhost:4005/registerdEvents/3?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
           console.log(data)
           setMongoData(data)
        })
    }, [loggedInUser.email])
    return (
        <div>
           {
               mongoData.map(mongo => <li key={mongo._id}>Email: {mongo.email}, {mongo.eventName}, Date: {mongo.registatingDate}</li> )
           }
        </div>
    );
};

export default Events;