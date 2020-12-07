import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import '../../App.scss'
import {fetchCart} from '../../redux/actions/cartActions'
import {Row,Col,Image,Card, ListGroup,Form,Button} from 'react-bootstrap'
const Cart = () => {
 const dispatch = useDispatch()
 const auth = useSelector((state) => state.auth)
  const {user} = auth
 const Cart= useSelector(state=>state.cart)
 const {cartLoading,cartError,cart}=Cart;
 useEffect(() => {
  const getCart =async()=>{
    await dispatch(fetchCart())
  }
  getCart();
 }, [])
 return (
   <div style={{margin:"5% 10%"}}>
  <Row className='d-flex justify-content-around'>
      <Col md={cart.length===0?12:7}>
        <h3 className='px-3'>My Cart</h3>
        {cart.length === 0 ? (
          <div className='mt-4 d-flex flex-column align-items-center justify-content-center'>
          <img src="./images/cart.png" className="mb-2"/>
          {
            user?
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
            {cart.map((i) => i.cartItems.map((item)=>
              (
              <ListGroup.Item key={item.product._id}>
                <Row className='my-2'>
                  <Col className='my-2' md={3}>
                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                  </Col>
                  <Col md={3} className='my-2'>
                    <Link style={{textDecoration:"none",color:"#007185",fontWeight:"500"}} to={`/product/${item.product._id}`}>{item.product.name}</Link>
                  </Col>
                  <Col md={2} className='my-2'><p style={{fontWeight:"500"}}>₹ {item.product.price.toLocaleString()}</p></Col>
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
                  <Col md={2} className='my-2'>
                    <Button
                      className="remove p-0 m-0"
                     style={{background:"white",color:'red',border:'none'}}
                      onClick={() => console.log('Remove')}
                    >
                     <p>REMOVE</p>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            )))}
          </ListGroup>
        )}
      </Col>
      {
        cart.length>0&&
      <Col md={4} className='my-4'>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item className='my-2'>
              <h4>
                Price Details
              </h4>
              </ListGroup.Item>
              <ListGroup.Item className='my-2'>
              <p>Price ({cart.map((i)=>i.cartItems.reduce((acc, item) => acc + item.qty, 0))} items)
              <span style={{float:"right"}}>₹ {cart.map((i)=>i.cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
              ).toLocaleString()}
                </span> </p>
              <p>Discount (Inaugural Offer) <span style={{float:"right",color:'green'}}>− ₹ {(cart.map((i)=>i.cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
              )*0.1).toLocaleString()}</span></p>
              <p>Delivery <span style={{float:"right",color:"green",fontWeight:'500'}}> {cart.map((i)=>i.cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
              )>=499 ? "FREE" :"₹ 50"}</span></p>
              <br/>
              <p style={{fontWeight:"500",fontSize:"18px"}}>Total Amount<span style={{float:"right",fontWeight:'500'}}>₹ {(cart.map((i)=>i.cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
              )*0.9).toLocaleString()}</span></p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                style={{border:"none",background:"#ff7043"}}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      }
    </Row>
    </div>
 )
}

export default Cart
