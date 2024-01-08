import React, { useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/User';
import {createReviewSchema} from '../validation/validation';
import './Products.css';


export default function Products() {
    const {productId} = useParams();
    const {addToCartContext} = useContext(CartContext);
    const getProduct = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        console.log(data.product.reviews);
        return data.product;
    }

    const {data,isLoading} = useQuery('product',getProduct);
    const addToCart = async (productId)=>{
        const res = await addToCartContext(productId) ;
    }
    if(isLoading){
        return <p>loading...</p>
    }

    let {userToken,setUserToken} = useContext(UserContext);
    
    const onSubmit = async users=>{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,users,
        {headers:{Authorization:`Tariq__${userToken}`}});
        if(data.message=='success'){
            console.log(data.order);
            toast.success('comment added successfully',{
                position:"top-right",
                autoClose:false,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggabletrue:true,
                progress:undefined,
                theme:"dark"
            });
            }
        }
    
    const formik = useFormik({
        initialValues:{
          
            rating:'',
            comment:'',
        },
        onSubmit,
        validationSchema:createReviewSchema,
    });
    const inputs = [
        
        {
            id:'rating',
            type:'rating',
            name:'rating',
            title:'user rating',
            value:formik.values.rating,
        },
        {
            id:'comment',
            type:'comment',
            name:'comment',
            title:'user comment',
            value:formik.values.comment,
        },     
    ];
    const renderInputs = inputs.map( (input,index)=>
    <Input 
    type={input.type} 
    id={input.id} 
    name={input.name} 
    title={input.title} 
    value={input.value} 
    key={index} 
    errors={formik.errors} 
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    touched={formik.touched}
    />
    ) 


  return (
    <div className='container'>
        <div className='row' >
            <div className='col-lg-4'>
                {data.subImages.map((img,index)=>
                <div className='w-75' key={index}>
                <img src={img.secure_url} className='w-100' />
                </div>
                
                )}
            </div>
            <div className='col-lg-8' >
                <h2>{data.name}</h2>
                <p>{data.price}</p>
                <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)} >Add to Cart</button>
                <p>Reviews:</p>
                {data.reviews.map((review)=>
                <div >
                    <div className='d-flex'>                    
                    <img className='col-md-2 rounded-circle img-fluid '  src={review.createdBy.image.secure_url} />
                    <h3 className='col-md-5' > {review.createdBy.userName} </h3>
                    <p className='col-md-3' >rating: {review.rating} </p>
                    </div>
                <p> comment: {review.comment}</p>
                </div>
                )}
            <div >
               <h2>Add your comment</h2>
               <form onSubmit={formik.handleSubmit}>
                   {renderInputs}
                   <button className='btn btn-outline-secondary my-5  py-3 px-5' type='submit' disabled={!formik.isValid} >Add Comment</button>
               </form>
            </div>

            </div>

        </div>
    </div>
  )
}