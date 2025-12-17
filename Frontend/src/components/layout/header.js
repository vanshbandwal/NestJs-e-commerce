import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo/logo.png"
import "../../styles/HeaderStyle.css"
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useContext } from 'react';
import { shopcontext } from '../../store/context';


const Header = () => {
  const [nav , setnav] = useState(false);
  const [totalItem,setTotalItem] = useState(0)
   const {getTotalCartItem,cartItem} = useContext(shopcontext)
  
  useEffect(async()=>{
    let total = await getTotalCartItem()
    setTotalItem(total)
  },[cartItem])

  const changeValueOnScroll = ()=>{
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 100 ? setnav(true) : setnav(false)
  }
  window.addEventListener("scroll",changeValueOnScroll)
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={`${nav === true ? "sticky" : " "}`}>
        <Container>
          <Navbar.Brand href="#home">
            <Link className='logo'>
              <img src={Logo} alt="Logo" className='img-fluid' />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link ><AnchorLink className='anchor-link' offset={50} href='#Home'><p>Home</p></AnchorLink></Nav.Link>
              <Nav.Link as={Link} ><AnchorLink className='anchor-link' offset={50} href='#About'><p>About</p></AnchorLink></Nav.Link>
              <Nav.Link as={Link} ><AnchorLink className='anchor-link' offset={50} href='#Menu'><p>Our menu</p></AnchorLink></Nav.Link>
              <Nav.Link as={Link} ><AnchorLink className='anchor-link' offset={50} href='#Shop'><p>Shop</p></AnchorLink></Nav.Link>
              <Nav.Link as={Link} ><AnchorLink className='anchor-link' offset={50} href='#Blog'><p>Blog</p></AnchorLink></Nav.Link>
              <Nav.Link as={Link} ><AnchorLink className='anchor-link' offset={50} href='#Contact'><p>Contact</p></AnchorLink></Nav.Link>
              {localStorage.getItem('auth-token')? <Nav.Link as={Link} ><p><Link to="/login"><button className='login' onClick={()=>{
                localStorage.removeItem('auth-token')
                window.location.replace('/')
              }}>Logout</button></Link></p></Nav.Link>:<Nav.Link as={Link} ><p><Link to="/login"><button className='login'>Login</button></Link></p></Nav.Link>}
              <Nav.Link as={Link} ><Link to='/cart'><div className='cart'>
                <i class="bi bi-bag fs-5"></i>
                <em className='roundpoint'>{totalItem}</em>    
              </div>
              </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header