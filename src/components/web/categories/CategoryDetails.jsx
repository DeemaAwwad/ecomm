import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function CategoryDetails() {
    const {categoryId} = useParams();
    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }
    const {data,isLoading} = useQuery('category_detils',getCategoryDetails);
    if(isLoading){
        return <p>loading...</p>
    }
  return (

     <div className='products d-flex flex-row ' >
        {data.length?data.map((product)=>
          <div className='product' key={product._id} >
            <img className='w-50 h-50 mt-5 pt-5 ps-5' src={product.mainImage.secure_url} />
            <h2 className='ps-5 pt-3'>{product.name}</h2>
            <Link to={`/product/${product._id}`} className='ps-5'>details</Link>
          </div>
          ):<h2>no product</h2>
        }
    </div>

  )
}
