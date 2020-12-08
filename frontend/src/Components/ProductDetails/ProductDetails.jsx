import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Rating from '../Rating/Rating'
import '../../App.scss'
import {Row,Col,Image,Card, ListGroup,Container,Form} from 'react-bootstrap'
import Loader from '../Loader/Loader';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ButtonLoader from "../ButtonLoader/ButtonLoader"
import {fetchProduct} from '../../redux/actions/productActions'
import {addProductToCart} from '../../redux/actions/cartActions'
const ProductDetails = ({match,history}) => {
 const dispatch = useDispatch()
 const Products =useSelector(state=>state.products);
 const auth =useSelector(state=>state.auth);
 const Cart= useSelector(state=>state.cart)
 const [qty, setQty] = useState(1)
 const {product,productLoading,error} =Products;
 const {cartLoading,cartError}=Cart;
 const {authLoading}=auth
 const addToCart=async()=>{
  await dispatch(addProductToCart(match.params.id,qty));
  history.push(`/cart`)
 }
 useEffect(() => {
  async function getProduct(){
  await dispatch(fetchProduct(match.params.id))
  }
  getProduct();
  console.log(product)
 }, [cartError])
 return (
  <>
  <Container>
  <Link className='btn btn-light my-3' to='/'>
   Go Back
  </Link>
  {/* {cartLoading?<Loader/>:cartError?(<ErrorMessage variant="danger">{cartError}</ErrorMessage>):null} */}
  {productLoading && !authLoading?<Loader/>:error?(<ErrorMessage variant="danger">{error}</ErrorMessage>):authLoading?null:
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
    <Rating rating={product.rating} text={`${product.numReviews} ratings`}/>
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
    {
     product.countInStock>0 &&(
      <ListGroup.Item>
     <Row>
      <Col>
       Qty:
      </Col>
      <Col>
      {/* <input type="text" list="data" onChange={(e)=>setQty(e.target.value)} /> */}
      {/* <datalist> */}
      <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)} >
       {[...Array(product.countInStock).keys()]
       .map(v=><option key={v+1} value={v+1}>{v+1}</option>)
       }
       {/* </datalist> */}
      </Form.Control>
      </Col>
     </Row>
    </ListGroup.Item>
     )
    }
    <ListGroup.Item>
     <button  disabled={product.countInStock === 0}  onClick={addToCart} className="btn-block" style={{background:"#ff7043",fontSize:"16px",border:"none",color:"white",fontWeight:'500',padding:'12px 20px'}} type="button">{!cartLoading?
     <>
      <i className='fas fa-shopping-cart'></i>
      <span className='ml-4'> ADD TO CART</span>
     </>:
     <>
     <ButtonLoader/>
     <span className='ml-4'> GOING TO CART</span>
     </>
     }</button>
    </ListGroup.Item>
   </ListGroup>
  </Card>
 </Col>
  </Row>
  }
  </Container>
  </>
 )
}

export default ProductDetails
