import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import firebaseConfig from './firebaseConfig'
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)  
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

    const [regisData, setRegisData] = useState({});

    console.log(regisData.email);


    const [newUser, setNewUser] = useState();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        if(newUser){
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
               console.log('User created successfully');
               const user = { ...data}
               user.displayName = data.displayName
               user.registatingDate = new Date().toDateString();
               setLoggedInUser(user)
               if(user.email){
                 setRegisData(user)
               }
               if(regisData.email){
                history.replace(from);
               }
            })
            .catch((error) => {
               console.log(error);
            });
        }
        if(!newUser){
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
               console.log('Logged in successfully');
               setLoggedInUser(data)
              
                  history.replace(from);
               
            })
            .catch((error) => {
              console.log(error);
            });
        }
    };
// implement google sign in -----------------------------------------------------------------------------------
   var provider = new firebase.auth.GoogleAuthProvider();
   const handleGoogleSignIn = () =>{
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = {...regisData}
            user.email = result.user.email
            user.displayName = result.user.displayName
            user.registatingDate = new Date().toDateString();
            setLoggedInUser(user)
            if(result.additionalUserInfo.isNewUser === true && result.user.email){
                setRegisData(user)
            }
           
            if(result.additionalUserInfo.isNewUser === false){
                history.replace(from);
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() =>{
        if(regisData.email){
          fetch('http://localhost:4005/regisData', {
            method: "POST",
            body:JSON.stringify(regisData),
            headers: {
              "Content-type": "application/json"
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if(data) {
                history.replace(from);
            }
          })
        }
      }, [regisData.email])

        


    return (
        <div>
            {
                newUser ? <form onSubmit={handleSubmit(onSubmit)}>
                <div className="newUserForm">
                    <input className="input" type="text" placeholder="Full Name" {...register("displayName", {required: true, maxLength: 8})} /> 
                    <br/>{errors.displayName && errors.displayName.type === "required" && <span className="error">First name is required</span>}
                    {errors.displayName && errors.displayName.type === "maxLength" && <span className="error">Max length exceeded</span> }
                    
                    <br/> <br/>

                    <input className="input" type="text" placeholder="Email" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />    
                    <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
                    {errors.email && errors.email.type === "pattern" && <span className="error">You should insert email like this format /\S+@\S+\.\S+/ pattern</span> }
                    
                    <br/> <br/>

                    <input className="input" type="tel" placeholder="Mobile number" {...register("number", {required: true, minLength: 6, maxLength: 12})} />   
                    <br/> {errors.number && errors.number.type === "required" && <span className="error">Mobile number is required</span>}
                    {errors.number && errors.number.type === "maxLength" && <span className="error">Max length exceeded</span> }
                   
                    <br/><br/>

                    <input className="input" type="password" placeholder="Password" {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, minLength: 8, maxLength: 30})} />
                    <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                    {errors.password && errors.password.type === "pattern" && <span className="error">Password must have min 1 uppercase letter,  <br/> min 1 lowercase letter, min 1 <br/> special character, min 1 number, min <br/> 8 characters, max 30 characters.</span> }
                    
                    <br/> <br/>

                        <div className="radioInput">
                        <span>Are you a developer?</span>  <br/>
                            <label htmlFor="Developer">1. Yes</label> <input  {...register("Developer", { required: true })} type="radio" value="Yes" /> <br/>
                            <label htmlFor="Developer">2. No</label> <input {...register("Developer", { required: true })} type="radio" value="No" /> 
                        </div>
                    
                    <br/> <br/>

                    <input className="input" value="Submit" type="submit" />
                </div>
            </form>
            : 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="newUserForm">
                    <input className="input" type="text" placeholder="Email" {...register("email", {required: true})} />    
                    <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
                   
                    <br/> <br/>

                    <input className="input" type="password" placeholder="Password" {...register("password", {required: true})} />
                    <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                    
                    <br/> <br/>

                    <input className="input" value="Submit" type="submit" />
                </div>
            </form>
            } <br/>
            {
            newUser ? <p >Already have an account? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Log In</span></p> : 
            <p>Are you a new user? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Sign Up</span></p>
            }

            <br/> <br/>

            <p style={{color: 'blue'}} onClick={handleGoogleSignIn}>Continue with Google</p>
        </div>
    );
};

export default Login;