import React from 'react'
import NavHeader from './layout/cartHeader'
import Footer from './layout/footer'
import '../styles/cartMessage.css'

const NullMessage = () => {
  return (
    <div>
        <NavHeader />
        <div className='cartMessage'>Please Login First !!</div>
        <Footer/>
    </div>
  )
}

export default NullMessage