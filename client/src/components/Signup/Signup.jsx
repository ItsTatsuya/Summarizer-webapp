import React from 'react'
import "./Signup.css"
export const Signup = () => {
  return (
    <div className='body'>
        <div className='main'>
            <h1 className='header'>Register</h1>
            <p className='text'>Enter your information to create an account</p>
            <form className='registerform'>
                <label  htmlFor='name'>Full name</label>
                <input type='text' id='name' name='name' required/>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' required/>
                <label htmlFor='password'>Confirm Password</label>
                <input type='password' id='confirmpassword' name='confirmpassword' required/>

                <div className='register'>
                    <button type='submit' onClick={''} className='registerbutton'>Register</button>
                </div>

                <div className='Rgoogle'>
                    <button type='submit' onClick={''} className='Rgooglebutton'>Register with Google</button>
                </div>

                <div className='login'>
                    <p className='logintext'>Already have an account? <br />
                        <a href='#' className='loginlink'>Log in instead</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}
