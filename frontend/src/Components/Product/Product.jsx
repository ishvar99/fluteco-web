import React from 'react'
import {Card} from 'react-bootstrap';
import Rating from '../Rating/Rating';
const Product = ({product}) => {
 return (
  <>
   <Card className="my-3 p-3 rounded">
   <a href={`/product/${product._id}`}>
   <Card.Img variant="top" src={product.image} />
   </a>
  <Card.Body>
    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
    <Card.Text as="div">
    <div className="my-3">
  <Rating rating={product.rating}/>
    </div>
    </Card.Text>
    <Card.Text as="h5">
     ₹{product.price}
    </Card.Text>
  </Card.Body>
   </Card>
  </>
 )
}

export default Product
