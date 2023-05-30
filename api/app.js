import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import cors from 'cors';
import User from './models/user.js';
import bcrypt from 'bcryptjs';
import  Jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import fs from 'fs';
import Post from './models/post.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const salt = bcrypt.genSaltSync(5);
const secret = 'vgcvgakvkfuuygfy643trgiubkja6d56468er7g4';

const app = new express();
app.use(cors({credentials:true , origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads' , express.static(__dirname+'/uploads'));


mongoose.connect("mongodb://127.0.0.1:27017/BLOG");


app.post("/register" , async(req,res)=>{
    const{username , email , password} = req.body;
    try{
        const user = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password,salt)
        })
        // console.log(user);
        res.json(user);
    }
    catch(e){
        // console.log(e);
        res.status(400).json(e);
    }
    

})

app.post("/login" , async (req,res)=>{
    const{username, password} = req.body;
    try{
        const userFromDB = await User.findOne({username: username});
        const result = bcrypt.compareSync(password , userFromDB.password);
        if(result){
            Jwt.sign({username, id:userFromDB._id}, secret ,{} ,(err,token)=>{
                res.cookie('token' , token).json({
                    id:userFromDB._id,
                    username
                });
            })
        }
        else{
            res.status(400).json('wrong credentials');
        }
    }
    catch(e){
        res.status(400).json(e);
    }
})

app.get("/profile" , (req,res)=>{
    const {token} = req.cookies;
    Jwt.verify(token , secret , {} , (err , info)=>{
        if(err) throw err;
        else res.json(info);
    })
})

app.post("/logout" , (req,res)=>{
    res.cookie('token',"").json("logged out").redirect("/");
})


app.post("/post" , upload.single('file') ,async (req,res)=>{
    const{originalname,path} = req.file;
    const parts = originalname.split('.');
    const extention = parts[parts.length -1];
    const newpath = path +'.'+ extention;
    fs.renameSync(path , newpath);

    const{title, summary, content, category, createdAt} = req.body;

    const {token} = req.cookies;
    Jwt.verify(token , secret , {} , async (err , info)=>{
        if(err) throw err;
        const storedPost = await Post.create({
            title,
            summary,
            content,
            thumbnail: newpath,
            category,
            authorID:info.id
        });
    
        res.json(storedPost);
    })    
})

app.get("/categories" , async (req,res)=>{
    res.json(await Post.find({} , {category:1 , _id:0}));
})



app.get("/:cat" ,async (req,res)=>{
    const category = req.params.cat;
    try{
        if(category === "All Categories"){
            res.json(await Post.find().populate("authorID",["username"]));
        }
        else{
            res.json(await Post.find({category:category}).populate("authorID",["username"]));
        }
    }
    catch(err){
        res.status(400).json(err);
    }
    
    
})

app.listen(3002 , ()=>{
    console.log("server running on port 3002");
})