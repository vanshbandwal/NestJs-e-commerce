import React, { useState } from 'react'
import './create_list.css'
import upload_area from '../../assets/upload_cloud_icon.svg'
import axios from 'axios';
const AddProduct = () => {
    const [image, setimage] = useState(false);
    const [productDetails, setproductDetails] = useState({
        name: '',
        image: '',
        discription: '', 
        price: '',

    })
    const imageHandler = (e) => {
        setimage(e.target.files[0])
    }


    const changeHandler = (e) => {
        setproductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
    const Add_Product = async () => {
        console.log(productDetails)
        let product = productDetails
        let formdata = new FormData()
        formdata.append('product', image)
        console.log(formdata)
        let response = await axios.post('http://localhost:3000/api/upload', formdata)
        if (response.data.success === true) {
            product.image = response.data.image_url;
            let d = await axios.post('http://localhost:3000/api/addproduct', product)
            if (d.data.success === true) {
                alert(d.data.message)
                setproductDetails({
                    name: '',
                    image: '',
                    discription: '',
                    price: '',
                })
                setimage('')
            }

        }

    }
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type="text" name="discription" placeholder='Type here' onChange={changeHandler} value={productDetails.discription} />
            </div>
            <div className='addproduct-price'>
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" name="price" placeholder='Type here' onChange={changeHandler} value={productDetails.price} />
                </div>
                <div className="addproduct-itemfield">
                    <p>Name</p>
                    <input type="text" name="name" placeholder='Type here' onChange={changeHandler} value={productDetails.name} />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button className='addproduct-btn' onClick={Add_Product}> Add
            </button>
        </div>
    )
}

export default AddProduct