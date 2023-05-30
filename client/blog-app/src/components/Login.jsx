import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userContext } from '../App';

const Login = () => {

    const[username , stusername] = useState("");
    const[password , setpassword] = useState("");
    const[isloggedin , setisloggedin] = useState(false);
    const{setusername} = useContext(userContext);

    const submitlogin = (event)=>{
        event.preventDefault();
        fetch("http://localhost:3002/login" , {
            method: 'POST',
            body: JSON.stringify({username , password}),
            headers: {'Content-Type' : 'application/json'},
            credentials: 'include'
        }).then(res=>{
            console.log(res);
            if(res.ok === false){
                console.log("firse dalo");
                stusername("");setpassword("");
                alert("Wrong credentials");
            }
            else{
                res.json().then(usname=>{
                    setusername(usname.username)
                    setisloggedin(!isloggedin);
                })
            }
        })
    }

    if(isloggedin){
        return <Navigate to={'/'} />
    }

    return (
        <div className='login' onSubmit={submitlogin}>
            <form>
                <input type='text' placeholder='Username'
                    value={username}
                    onChange={(event)=>{stusername(event.target.value)}}
                />
                <br/>
                <input type='text' placeholder='Password' 
                    value={password}
                    onChange={(event)=>{setpassword(event.target.value)}}
                />
                <br/>
                <button type='submit'>Login</button>
                <p>Haven't Regestered yet?</p>
                <p>Click <Link to="/register">Here</Link> To Register Your Self</p>
            </form>
        </div>
    );
};

export default Login;