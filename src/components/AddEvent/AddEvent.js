import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";


const AddEvent = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const {id} = useParams();
    const [uniqueData, setUniqueData] = useState();
    useEffect(() => {
        fetch(`http://localhost:4005/events/${id}`)
        .then(res => res.json())
        .then(data => setUniqueData(data))
    }, [])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const newData = {...loggedInUser, ...data, ...uniqueData}
        console.log(newData);
        
        // fetch('http://localhost:4005/register', {
        //     method: 'POST',
        //     body:JSON.stringify(newData),
        //     headers: {
        //       'Content-type': 'application/json; charset=UTF-8',
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         console.log(json)
        //     });
        //     alert('Registerd Successfull')
        fetch('http://localhost:4005/register', {
          method:'POST',
          body:JSON.stringify(newData),
          headers: {
            'Content-type':'application/json'
          }
        })
        .then(res=> res.json())
        .then(data => {
          console.log(data);
        })
        alert('Submitted Successfully')
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        
        <input type="date" {...register("registerDate", { required: true })} />
        {errors.registerDate && <span>Register Date  is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default AddEvent;