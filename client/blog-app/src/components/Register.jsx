import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Register = () => {


    const[username , setusername] = useState("");
    const[password , setpassword] = useState("");
    const[email , setemail] = useState("");
    const[isdone , setisdone] = useState(false);
 

    async function registeruser(event){
        event.preventDefault();
    
        await fetch("http://localhost:3002/register" ,{
            method: 'POST',
            body: JSON.stringify({username,email,password}),
            headers: {'Content-Type' : 'application/json'},
        }).then(res=>{
            if(res.ok === true){
             alert('Registration successfull');
                setisdone(!isdone);
            }
            else
             alert('Registration failed')
        })
    }

    if(isdone) return <Navigate to="/login" />

    return (
        <div className='register'>
            <form onSubmit={registeruser}>
                <input type='text' placeholder='Username'
                    value={username}
                    onChange={(event)=>{setusername(event.target.value)}}
                />
                <br/>
                <input type='email' placeholder='E-mail' 
                    value = {email}
                    onChange={(event)=>{setemail(event.target.value)}}
                />
                <br/>
                <input type='text' placeholder='Password' 
                    value = {password}
                    onChange={(event)=>{setpassword(event.target.value)}}
                />
                <br/>
                <button onSubmit={registeruser} type='submit'>Register</button>
                <p>Already Registered?</p>
                <p>Click <Link to="/login">Here</Link> To Login</p>
            </form>
        </div>
    );
};

export default Register;