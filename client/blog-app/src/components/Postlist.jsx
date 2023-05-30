import React, { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { userContext } from '../App';
import Category from './Category';
import { Link, useNavigate } from 'react-router-dom';

const Postlist = () => {
    const Navigate = useNavigate();

    const[posts , setposts] = useState([]);

    const{category} = useContext(userContext);

    useEffect(()=>{
        fetch("http://localhost:3002/"+category)
        .then(Response=>Response.json().then(posts=>{
            if(posts.length === 0) setposts([]);
            else setposts(posts);
        }))
    },[category])

    if(posts.length === 0){
        return <div className='err'>
            <Category />
            <h1 style={{textAlign:'center',marginTop:'80px'}}>No Posts Of Selected Category</h1>
        </div>
    }

    return (
        
        <div className='main'>
                    <Category />
            <h2 style={{textAlign:'center'}}>{category}</h2>
            <div className='posts'>
                {posts.length > 0 && posts.map((post)=>{
                    return <Post {...post}/>
                })}
            </div>
        </div>
    );
};

export default Postlist;