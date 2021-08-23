import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Donations() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  
  const [img, setImg] = useState();
  console.log(img);

  const handleChange = event =>{
    const formData = new FormData();
    formData.set("key", "d6408fd23ac197963ec4c7136a219878");
    formData.append("image", event.target.files[0]);
    axios.post("https://api.imgbb.com/1/upload", formData)
    .then(res => {
        console.log(res.data.data.display_url);
        setImg(res.data.data.display_url)
    })
    .catch(error => {
        console.log(error);
    })

}

  const onSubmit = data => {
    console.log(data)
    const newData = {...data, image: img};
    console.log(newData);
    fetch("http://localhost:4005/addEvents", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        alert('Submitting Data Successfully');
    })

  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Event Name" {...register("eventName", { required: true })} />
      {errors.eventName && <span>Event Name is required</span>}
       
       <br/><br/>

      <input type="date" {...register("siteAddDate", { required: true })} />
      {errors.siteAddDate && <span>Date is required</span>}

      <br/><br/>

      <input onChange={handleChange} placeholder="Select an image" type="file"/>

      <br/><br/>
      
      <input type="submit" />
    </form>
  );
}