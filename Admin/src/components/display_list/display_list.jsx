import React, { useEffect, useState } from 'react'
import './display_list.css'
import cross_icon from '../../assets/cart_cross_icon.png'
import axios from 'axios'
const ListProduct = () => {
  const [allproduct, setAllproduct] = useState([])
    
  const fetchapp = async()=>{
    let res = await axios.get('http://localhost:3000/api/getproducts')
    setAllproduct(res.data.product)
  }
  useEffect(()=>{
    fetchapp()
  },[allproduct])
  const removeproduct = async(id)=>{
    let res = await axios.post('http://localhost:3000/api/removedproduct',{id:id})
    await fetchapp()
  }
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Name</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproduct'>
        <hr />
        {allproduct.map((product, index) => {
          return <>
            <div className='listproduct-format-main listproduct-format' key={index}>
              <img src={product.image} alt="" className='listproduct-product-icon' />
              <p>{product.discription}</p>
              <p>{product.name}</p>
              <p>${product.price}</p>
              <img src={cross_icon} alt="" className='listproduct-remove-icon' onClick={()=>{removeproduct(product._id)}}/>
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct