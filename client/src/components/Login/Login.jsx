import React from 'react'
import "./Login.css"

export const Login = () => {
    return (
        <div className='body'>
            <div className='main'>
                <h1 className='header'>Login</h1>
                <p className='text'>Enter your login credentials</p>
                <form action=''>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type='email' id='email' name='email' placeholder='Enter your email' required />
                    <label htmlFor="password">Password</label>
                    <input type='password' id='password' name='password' placeholder='Enter your Password' required />

                    <div className='login'>
                        <button type='submit' onClick={''} className='loginbutton'>Login</button>
                    </div>
                    <div className='creat account'>
                        <button type='submit' onClick={''} className='createaccountbutton' >Create an account</button>
                    </div>
                    <div className='Logingoogle'>
                        <button type='submit' onClick={''} className='Logingooglebutton'>Login with Google</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
