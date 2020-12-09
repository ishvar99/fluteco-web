const asyncHandler = require('../middlewares/asyncHandler');
const Cart = require('../models/cart')
const Product =require('../models/product');
exports.displayCart=asyncHandler(async (req,res,next)=>{
    const cart =await Cart.findOne({user:req.currentUser.id}).populate('cartItems.product').exec()
    if(cart)
    res.json(cart);
    else
    res.json({})
  })

exports.addToCart =asyncHandler(async (req,res,next)=>{
 let currentCart = await Cart.findOne({user:req.currentUser.id})
  if(!currentCart)
  {
  // cart does not exist for current user, create new cart
  let updatedCart = await Cart.create({
    user:req.currentUser,
    cartItems:[req.body]
   })
   res.json(updatedCart)
   return;
  }
  let foundProduct=currentCart.cartItems.filter((e)=>e.product.toString()===req.body.product)[0];
  if(!foundProduct){
    // Product doesn't exist in the cart
    let updatedCart =await currentCart.updateOne({
      "$push":{
       cartItems:req.body
      },
     },{new:true})
     res.json(updatedCart)
  }
   else{
     const product=await Product.findById(req.body.product);
     const stockCount =product.countInStock;
    const productQuantity=foundProduct.qty;
    const quantity=parseInt(req.body.qty)
   let updatedCart= await Cart.findOneAndUpdate({user:req.currentUser.id,'cartItems.product':req.body.product},
   {$inc:{'cartItems.$.qty':productQuantity+quantity>stockCount?stockCount-productQuantity:quantity}})
   if(productQuantity+quantity>stockCount)
    res.json({message:"Product limit exceeded"});
  else
  res.json(updatedCart)
   }
})

exports.removeFromCart=asyncHandler(async (req,res,next)=>{
  let updatedCart=await Cart.findOneAndUpdate({user:req.currentUser.id},{
    "$pull":{"cartItems":{"product":req.body.product}}
  },{new:true}).populate('cartItems.product').exec();
  console.log(updatedCart)
  res.json(updatedCart)
})