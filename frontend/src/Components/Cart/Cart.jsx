import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import '../../App.scss'
import {fetchCart} from '../../redux/actions/cartActions'
import {removeProductFromCart} from '../../redux/actions/cartActions'
import Loader from '../../Components/Loader/Loader'
import {Row,Col,Image,Card, ListGroup,Form,Button} from 'react-bootstrap'
const Cart = () => {
 const dispatch = useDispatch()
 const auth = useSelector((state) => state.auth)
  const {user,authLoading} = auth
 const Cart= useSelector(state=>state.cart)
 const specialDiscountLimit=2500;
 const deliveryChargeLimit=499;
 const {cartLoading,cartError,cart}=Cart;
 const [totalPrice, setTotalPrice] = useState(0)
 const [totalUnits,setTotalUnits]=useState(0)
 const [specialDiscount,setSpecialDiscount]=useState(0)
 const [deliveryPrice,setDeliveryPrice]=useState(0)
 const removeFromCart=async (productId)=>{
await dispatch(removeProductFromCart(productId));
 }
 useEffect(() => {
   
  const getCart =async()=>{
    await dispatch(fetchCart())
  }
  getCart();
 }, [])
 useEffect(() => {
  if(!cartLoading && cart && Object.keys(cart).length !== 0){
    console.log(cart);
    const _units=cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
    const _price=cart.cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);
   setTotalUnits(_units)
   setTotalPrice(_price)
   const discountFactor=_price*0.1;
   setSpecialDiscount(discountFactor>=specialDiscountLimit?specialDiscountLimit:discountFactor)
   setDeliveryPrice(_price>=deliveryChargeLimit?0:40)
  }
 }, [cartLoading,cart])
 return (
   <>
  {
  cartLoading && !authLoading?
    <div>
      <Loader/>
    </div>:
   <div style={{margin:"5% 10%"}}>
  <Row className='d-flex justify-content-around'>
      <Col md={7}>
        <h3 className='px-3'>My Cart</h3>
        {cart && ( (cart.cartItems && cart.cartItems.length===0) || Object.keys(cart).length === 0 ) && !authLoading ? (
          <div className='mt-4 d-flex flex-column align-items-center justify-content-center'>
          <img src="./images/cart.png" className="mb-2"/>
          {
            user ?
            <p style={{fontSize:"18px"}}>
            Your cart is empty!</p>:
          <p style={{fontSize:"18px"}}>
            Missing your cart items?
          </p>
          }
          {
          !user? (
            <>
            <a href="/login" className='btn mr-2 px-4 py-2' style={{background:"#ff7043",color:'white'}}>
              Login
            </a>
            </>
        ):<a href="/" className='btn mr-2 px-4 py-2' style={{background:"#ff7043",color:'white'}}>
              Let's Shop
            </a>
          }
          </div>
        ) : (
          <ListGroup variant='flush'>
            {cart && cart.cartItems.map((item)=>
              (
              <ListGroup.Item key={item.product._id}>
                <Row className='my-2'>
                  <Col className='my-2' md={3}>
                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                  </Col>
                  <Col md={3} className='my-2'>
                    <Link style={{textDecoration:"none",color:"black",fontWeight:"500"}} to={`/products/${item.product._id}`}>{item.product.name}</Link>
                  </Col>
                  <Col md={2} className='my-2'><p style={{fontWeight:"500",color:"#007185"}}>₹ {item.product.price.toLocaleString()}</p></Col>
                  <Col md={2} className='my-2'>
                    <Form.Control
                     as='select'
                      value={item.qty}
                      onChange={(e)=>{
                       console.log('Update Quantity')
                      } 
                      }
                    >
                    
                      {[...Array(item.product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    
                    </Form.Control>
                  </Col>
                  <Col md={2} className='mt-3'>
                    <Button
                      className="p-0 m-0"
                     style={{background:"white",color:'red',border:'none'}}
                      onClick={()=>removeFromCart(item.product._id)}
                    >
                     <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {
        cart && cart.cartItems&& cart.cartItems.length!==0 && Object.keys(cart).length !== 0 &&
      <Col md={4} className='my-4'>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item className='my-2'>
              <h4>
                Price Details
              </h4>
              </ListGroup.Item>
              <ListGroup.Item className='my-2'>
              <p>Price ({totalUnits} items)
              <span style={{float:"right"}}>₹ {totalPrice.toLocaleString()}
                </span> </p>
              <p>Discount<span style={{color:'red',fontWeight:'500'}}>*</span> (Inaugural Offer) <span style={{float:"right",color:'green'}}>− ₹ {specialDiscount.toLocaleString()}</span></p>
              <p>Delivery <span style={{float:"right",color:"green",fontWeight:'500'}}>  {deliveryPrice===0?"FREE":`₹ ${deliveryPrice.toLocaleString()}`}</span></p>
              <br/>
              <p style={{fontWeight:"500",fontSize:"18px"}}>Total Amount<span style={{float:"right",fontWeight:'500'}}>₹ {(totalPrice-specialDiscount+deliveryPrice).toLocaleString()}</span></p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                style={{border:"none",fontSize:'16px',fontWeight:'500', background:"#ff7043",padding:'12px 20px'}}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      }
    </Row>
    </div>
  }
  </>
 );
}

export default Cart
