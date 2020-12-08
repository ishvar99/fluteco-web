const asyncHandler = require('../middlewares/asyncHandler');
const Cart = require('../models/cart')
const Product =require('../models/product')
exports.displayCart=asyncHandler(async (req,res,next)=>{
const cart =await Cart.find({}).populate('cartItems.product').exec()
res.json(cart);
})

exports.addToCart =asyncHandler(async (req,res,next)=>{
 let userCart = await Cart.findOne({user:req.currentUser.id})
  if(!userCart)
  {
    // create new cart
  newCart = await Cart.create({
    user:req.currentUser,
    cartItems:[req.body]
   })
   res.json(newCart)
  }
  if(userCart.cartItems.filter((e)=>e.product.toString()===req.body.product).length===0){
    console.log('hello')
    let updatedCart =await userCart.update({
      "$push":{
       cartItems:req.body
      },
     })
     res.json(updatedCart)
  }
  
   else{
     const product=await Product.findById(req.body.product);
     const stockCount =product.countInStock;
    let cartProduct =await Cart.findOne({user:req.currentUser.id,'cartItems.product':req.body.product});
    let actualQuantity;
    let productQuantity=cartProduct.cartItems[0].qty;
    if(productQuantity+req.body.qty >stockCount){
      actualQuantity=stockCount-productQuantity;
    }
    else{
      actualQuantity=req.body.qty;
    }
    console.log("New actualQuantity",actualQuantity);
   let updatedProduct= await Cart.findOneAndUpdate({user:req.currentUser.id,'cartItems.product':req.body.product},
   {$inc:{'cartItems.$.qty':actualQuantity}})
    res.json(updatedProduct);
   }
})