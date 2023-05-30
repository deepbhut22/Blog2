import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Postlist from './components/Postlist';
import Login from './components/Login';
import Register from './components/Register';
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { createContext } from 'react';
import NewPost from './components/NewPost';
import Category from './components/Category';


export const userContext = createContext();


function App() {

  const[username , setusername] = useState(null);
  const[category , setcategory] = useState("All Categories");
  const Client = new QueryClient();


  return (
    <QueryClientProvider client={Client}>
      <userContext.Provider value={{username , setusername , category , setcategory}}>
        <Router>
          <div className="App">
            <NavBar />

            <Routes>
              <Route exact path="/" element={<Postlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/create' element={<NewPost />} />
            </Routes>        
          </div>
        </Router>
      </userContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
