import React, { useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { userContext } from '../App';


const NavBar = () => {


    const {username , setusername} = useContext(userContext);

    useEffect(()=>{
        fetch("http://localhost:3002/profile",{
            credentials:'include'
        }).then(Response=>Response.json().then(info=>setusername(info?.username)));
    },[]);

    function logout(){
        fetch("http://localhost:3002/logout",{
            credentials:'include',
            method:'POST'
        })
        setusername(null);
        return <Navigate to="/"/>
    };

    return (
        <div className='nav'>
            <h1 className='logo'><Link style={{textDecoration:'none',color:"black",paddingLeft:'10%'}} to="/">Blog</Link></h1>

            {username && <ul style={{display:'flex',listStyleType:'none'}}>
                <li><Link style={{textDecoration:'none',color:"black"}} to="/create">Write New Post</Link></li>
                <li><Link style={{textDecoration:'none',color:"black"}} onClick={logout} to="/">Logout</Link></li>
            </ul>}
            {!username && <ul style={{display:'flex',listStyleType:'none'}}>
                <li><Link style={{textDecoration:'none',color:"black"}} to="/login">Login</Link></li>
                <li><Link style={{textDecoration:'none',color:"black"}} to="/register">Register</Link></li>
            </ul>}
            
        </div>
    );
};

export default NavBar;