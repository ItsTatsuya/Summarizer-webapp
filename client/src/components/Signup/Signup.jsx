import React, { useState } from 'react'
import axios from "axios"
import "./Signup.css"
import { Link } from 'react-router-dom'
export const Signup = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [cpass,SetCPassword]=useState();
    const [passwordsMatch,setPasswordMatch]=useState(true);
    
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(password===cpass){
            setPasswordMatch(true);
            axios.post('http://localhost:3001/register',{name ,email,password})
            .then(res=>{
                alert("ok")
            }).catch(err=>console.log(err))
        }
        else{
            setPasswordMatch(false);
        }
    } 

  return (
    <div className='body'>
        <div className='main'>
            <h1 className='header'>Register</h1>
            <p className='text'>Enter your information to create an account</p>

            {/* form tag */}
            <form className='registerform' onSubmit={handleFormSubmit}>
                <label  htmlFor='name'>Full name</label>

                {/* name field */}
                <input type='text' id='name' name='name' 
                onChange={(e)=>setName(e.target.value)} required/>

                {/* email field */}
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' 
                onChange={(e)=>setEmail(e.target.value)}required/>

                {/* password field  */}
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password'
                onChange={(e)=>setPassword(e.target.value)} required/>

                {/* password field  */}
                <label htmlFor='password'>Confirm Password</label>
                <input type='password' id='confirmpassword' name='confirmpassword' 
                onChange={(e)=>{SetCPassword(e.target.value)}} required/>
                {!passwordsMatch && 
                    <p className='error-password'>Passwords do not match</p>
                }

                <div className='register'>
                    <button type='submit'  className='registerbutton'>Register</button>
                </div>

                <div className='Rgoogle'>
                    <button type='submit' onClick={''} className='Rgooglebutton'>Register with Google</button>
                </div>

                <div className='login'>
                    <p className='logintext'>Already have an account? <br />
                        <Link to={"/login"} className='loginlink'>Log in instead</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}
