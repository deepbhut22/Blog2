import React from 'react';
import {format} from 'date-fns';

const Post = ({title,summary,content,createdAt,authorID,thumbnail}) => {

    return (
        <div className='post'>
        <div className='postimg'>
        <img src={'http://localhost:3002/'+thumbnail} alt='not found'/>
        </div>
                      
            <div className='content'>
                <h1 style={{marginBottom:'10px',fontSize:'40px'}}>{title}</h1>
                <p style={{fontWeight:'bold',marginTop:'0'}}>@{authorID?.username}</p>
                <p style={{fontWeight:'normal',color:'Gray'}}>{format(new Date(createdAt),'d MMM yyyy, HH:MM')}</p>
                <p style={{fontSize:'x-larger'}}>{summary}</p>
            </div>
        </div>
    );
};

export default Post;