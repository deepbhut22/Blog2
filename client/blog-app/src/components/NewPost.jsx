import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';



const NewPost = () => {

    const[title , settitle] = useState("");
    const[Summary , setsummary] = useState("");
    const[content , setcontent] = useState("");
    const[files , setfiles] = useState();
    const[category , setcategory] = useState("");
    const[tohome , settohome] = useState(false);


    const newpost = (event)=>{
        event.preventDefault();
        const data = new FormData();

        data.set('title' ,title);
        data.set('summary' , Summary);
        data.set('content' , content);
        data.set('file' , files[0]);
        data.set('category' , category);

        fetch("http://localhost:3002/post",{
            method:"POST",
            body: data,
            credentials: 'include'
        }).then(Response=>{
            if(Response.ok)
                settohome(!tohome);
        })
        
    }

    if(tohome){
        return <Navigate to="/"/>
    }

    return (
        <div className='newpost'>
            <form style={{textAlign:'center'}} onSubmit={newpost}>
                <input type="text" placeholder='Enter Post Title' 
                    value={title}
                    onChange={event=>{settitle(event.target.value)}}
                />
                <br/>
                <input type='text' placeholder='Enter Post Summary' 
                    value={Summary}
                    onChange={event=>{setsummary(event.target.value)}}
                />
                <br/>
                <select value={category} onChange={(event)=>setcategory(event.target.value)}>
                    <option value='category-1'>category-1</option>
                    <option value='category-2'>category-2</option>
                    <option value='category-3'>category-3</option>
                    <option value='category-4'>category-4</option>
                    <option value='category-5'>category-5</option>
                </select><br/>
                Select Thumbnail Of Your Post
                <input style={{width:'60%'}} type='file' placeholder='Select File' 
                    onChange={event=>{setfiles(event.target.files)}}
                />
                <br/>
                <ReactQuill style={{width:'80%',margin:'auto',textAlign:'left',backgroundColor:'white',scrollPaddingBottom:'30px'}}
                    value={content}
                    onChange={newcontent=>setcontent(newcontent)}
                />
                <br/>
                <button style={{margin:'auto'}}>Post</button>
            </form>
        </div>
    );
};

export default NewPost;