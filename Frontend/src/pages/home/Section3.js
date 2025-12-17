import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Cards from "./Card"
import { Link } from 'react-router-dom'
import { shopcontext } from '../../store/context'

// const mockData = [
//   {
//     id: "0001",
//     image: Image1,
//     title: "Crispy Chicken",
//     paragraph: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
//     rating: 5,
//     price: 99.15,
//   },
//   {
//     id: "0002",
//     image: Image2,
//     title: "Ultimate Bacon",
//     paragraph: "House patty, cheddar cheese, bacon, onion, mustard",
//     rating: 4.5,
//     price: 99.32,
//   },
//   {
//     id: "0003",
//     image: Image3,
//     title: "Black Sheep",
//     paragraph: "American cheese, tomato relish, avocado, lettuce, red onion",
//     rating: 4,
//     price: 69.15,
//   },
//   {
//     id: "0004",
//     image: Image4,
//     title: "Vegan Burger",
//     paragraph: "House patty, cheddar cheese, bacon, onion, mustard",
//     rating: 3.5,
//     price: 99.25,
//   },
//   {
//     id: "0005",
//     image: Image5,
//     title: "Double Burger",
//     paragraph: "2 patties, cheddar cheese, mustard, pickles, tomatoes",
//     rating: 3.0,
//     price: 59.25,
//   },
//   {
//     id: "0006",
//     image: Image6,
//     title: "Turkey Burger",
//     paragraph: "Turkey, cheddar cheese, onion, lettuce, tomatoes, pickles",
//     rating: 3,
//     price: 79.18,
//   },
//   {
//     id: "0007",
//     image: Image7,
//     title: "Smokey House",
//     paragraph: "patty, cheddar cheese, onion, lettuce, tomatoes, pickles",
//     rating: 2.5,
//     price: 99.19,
//   },
//   {
//     id: "0008",
//     image: Image8,
//     title: "Classic Burger",
//     paragraph: "cheddar cheese, ketchup, mustard, pickles, onion",
//     rating: 2.0,
//     price: 89.12,
//   },
//   // Add more mock data objects as needed
// ];

const renderRatingIcons = (rating) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating > 0.5) {
      stars.push(<i key={i} className='bi bi-star-fill'></i>)
      rating--;
    } 
    else if (rating > 0 && rating < 1) {
      stars.push(<i key={"half"} className='bi bi-star-half'></i>)
      rating--;
    }
    else {
      stars.push(<i key={`empty ${i}`} className='bi bi-star'></i>)
    }
  }
  return stars;
}
const Section3 = () => {
  const { mockData } = useContext(shopcontext)
  console.log(mockData)
  return (
    <section className='menu_section' id='Menu'>
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className='text-center mb-5'>
            <h2>OUR CRAZY BURGER</h2>
            <p className='para'>
              Aliquam a augue suscipit ,luctus neque ipsum neque undo
              dolor primis libero tempus, blandit a cursus various magna
            </p>
          </Col>
        </Row>
        <Row>
          {mockData.map((cardData, index) => (
            
            <Cards
              key={index}
              id={cardData.id}
              image={cardData.image}
              rating={cardData.rating}
              title={cardData.name}
              paragraph={cardData.discription}
              price={cardData.price}
              renderRatingIcons={renderRatingIcons}
              _id = {cardData._id}
            />
          ))}
        </Row>
        <Row className='pt-5'>
          <Col sm={6} lg={7}>
            <div className='ads_box ads_img1 mg-5 mb-md-0'>
              <h4 className='mb-0'>GET YOUR FREE</h4>
              <h5>CHEESE FRIES</h5>
              <Link to='/' className='btn btn_red px-4 rounded-0 ' style={{ background: "red", fontWeight: 600, color: "white" }}>Learn more</Link>
            </div>
          </Col>
          <Col sm={6} lg={5}>
            <div className='ads_box ads_img'>
              <h4 className='mb-0'>GET YOUR FREE</h4>
              <h5>CHEESE FRIES</h5>
              <Link to='/' className='btn btn_red px-4 rounded-0 ' style={{ background: "red", fontWeight: 600, color: "white" }}>Learn more</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section3      