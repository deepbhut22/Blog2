import React, { useContext } from 'react';
import {Link} from 'react-router-dom';

import { userContext } from '../App';

const Category = () => {

    const{setcategory} = useContext(userContext);

    return (
        <div className='category'>
            <Link style={{textDecoration:'none',color:'inherit'}} name="All Categories" onClick={()=>{setcategory("All Categories")}}>All Categories</Link>
            <Link style={{textDecoration:'none',color:'inherit'}} name="category-1" onClick={()=>{setcategory("category-1")}}>category-1</Link>
            <Link style={{textDecoration:'none',color:'inherit'}} name="category-2" onClick={()=>{setcategory("category-2")}}>category-2</Link>
            <Link style={{textDecoration:'none',color:'inherit'}} name="category-3" onClick={()=>{setcategory("category-3")}}>category-3</Link>
            <Link style={{textDecoration:'none',color:'inherit'}} name="category-4" onClick={()=>{setcategory("category-4")}}>category-4</Link>
            

        </div>
    );
};

export default Category;