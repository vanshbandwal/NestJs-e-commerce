import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const shopcontext = createContext({

})

const ShopContextProvider = (props) => {
    const [mockData, setmockData] = useState([])
    const [cartItems, setCartItems] = useState([]);
    const get = async () => {
        const res = await axios.get('http://localhost:3000/api/getproducts')
        setmockData(res.data.product)
    }
    const getcart = async () => {
        if (localStorage.getItem('auth-token')) {
            const res = await axios.get('http://localhost:3000/api/getcart', {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            })
            setCartItems(res.data.items)
        }
        else {
            setCartItems([])
        }
    }
    useEffect(() => {
        get()
        getcart()
    }, [])


    const addToCart = async (id) => {
        if (localStorage.getItem('auth-token')) {
            let res = await axios.post('http://localhost:3000/api/addtocart', { id }, {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
            setCartItems(res.data.items)
            window.location.replace('/')
        }
        else {
            alert('!Please login first.')
        }
    };
    const removeFromCart = async (id) => {
        if (localStorage.getItem('auth-token')) {
            let res = await axios.post('http://localhost:3000/api/removefromcart', { id }, {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
            if (res.data.success === true) {
                window.location.replace('/cart')
            }

        }
    };

    const getTotalCartAmount = async () => {
  if (localStorage.getItem('auth-token')) {
    try {
      const res = await axios.get('http://localhost:3000/api/totalAmount', {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json'
        }
      });
      return res.data.totalAmount || 0;   // assuming backend sends { success:true, total: number }
    
    } catch (err) {
      console.error("Error fetching total amount:", err);
      return 0;
    }
  } else {
    return 0;
  }
};

    const getTotalCartItem = async()=>{
       let res = await axios.get('http://localhost:3000/api/totalCart',{
        headers:{
           'auth-token': localStorage.getItem('auth-token'), 
        }
       })
       return res.data.total
    }


    const contextValue = { mockData, addToCart, removeFromCart, cartItems, getTotalCartAmount,getTotalCartItem }

    return (
        <shopcontext.Provider value={contextValue}>
            {props.children}
        </shopcontext.Provider>
    )

}
export default ShopContextProvider; 