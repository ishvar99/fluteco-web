const asyncHandler = require('../middlewares/asyncHandler');
const Cart = require('../models/cart')
const Product =require('../models/product');
exports.displayCart=asyncHandler(async (req,res,next)=>{
    const cart =await Cart.find({user:req.currentUser.id}).populate('cartItems.product').exec()
    res.json(cart);
 })

exports.addToCart =asyncHandler(async (req,res,next)=>{
 let currentUserCart = await Cart.findOne({user:req.currentUser.id})
  if(!currentUserCart)
  {
  // cart does not exist for current user, create new cart
  newCart = await Cart.create({
    user:req.currentUser,
    cartItems:[req.body]
   })
   res.json(newCart)
   return;
  }
  let foundProduct=currentUserCart.cartItems.filter((e)=>e.product.toString()===req.body.product)[0];
  if(!foundProduct){
    // Product doesn't exist in the cart
    let updatedCart =await currentUserCart.updateOne({
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
   let updatedProduct= await Cart.findOneAndUpdate({user:req.currentUser.id,'cartItems.product':req.body.product},
   {$inc:{'cartItems.$.qty':productQuantity+quantity>stockCount?stockCount-productQuantity:quantity}})
    res.json(updatedProduct);
   }
})