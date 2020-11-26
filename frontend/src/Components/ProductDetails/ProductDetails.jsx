import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Rating from '../Rating/Rating'
import '../../App.scss'
import {Row,Col,Image,Card, ListGroup,Container} from 'react-bootstrap'
import Loader from '../Loader/Loader';
import {fetchProduct} from '../../redux/actions/productActions'
const ProductDetails = ({match}) => {
 const dispatch = useDispatch()
 const Products =useSelector(state=>state.products);
 const {product,loading} =Products;
 useEffect(() => {
  console.log('Ishan is gr8')
  async function getProduct(){
  await dispatch(fetchProduct(match.params.id))
  }
  getProduct();
  console.log(product)
 }, [])
 return (
  <Container>
  <Link className='btn btn-light my-3' to='/'>
   Go Back
  </Link>
  {loading?<Loader/>:
  <Row>
  <Col md={6}>
  <Image src={product.image} alt={product.name} fluid/>
  </Col> 
 <Col md={3}>
  <ListGroup variant='flush'>
   <ListGroup.Item>
  <h3>{product.name}</h3>
   </ListGroup.Item>
   <ListGroup.Item>
    <Rating rating={product.rating} text={` ${product.numReviews} ratings`}/>
   </ListGroup.Item>
   {/* <ListGroup.Item as="div">
   <div style={{fontWeight:"500",fontSize:"22px"}}>₹ {product.price} /-</div>
   </ListGroup.Item> */}
 
   <ListGroup.Item style={{fontSize:'20px'}}>
    {product.description}
   </ListGroup.Item>
  </ListGroup>
 </Col>
 <Col md={3} className='my-auto'>
  <Card>
   <ListGroup variant='flush'>
    <ListGroup.Item>
     <Row>
      <Col>
       Price:
      </Col>
      <Col>
       <strong>₹ {product.price}</strong>
      </Col>
     </Row>
    </ListGroup.Item>
    <ListGroup.Item>
     <Row>
      <Col>
       Status:
      </Col>
      <Col style={{color:product.countInStock>0?"green":"red",fontWeight:"500"}}>
      {product.countInStock>0?'In Stock':'Out of Stock'}
      </Col>
     </Row>
    </ListGroup.Item>
    <ListGroup.Item>
     <button className="btn-block p-2" style={{background:"#ff7043",fontSize:"18px",border:"none",color:"white"}} type="button">Add to Cart</button>
    </ListGroup.Item>
   </ListGroup>
  </Card>
 </Col>
  </Row>
  }
  </Container>
 )
}

export default ProductDetails
