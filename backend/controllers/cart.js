const asyncHandler = require('../middlewares/asyncHandler');
const Cart = require('../models/cart')

exports.displayCart=asyncHandler(async (req,res,next)=>{
const cart =await Cart.find({}).populate('cartItems.product').exec()
res.json(cart);
})

exports.addToCart =asyncHandler(async (req,res,next)=>{
 let cart;
 cart = await Cart.findOneAndUpdate({user:req.currentUser.id},{
   "$push":{
    cartItems:req.body
   },
  },{new:true,useFindAndModify:false})

  if(!cart){
  cart = await Cart.create({
    user:req.currentUser,
    cartItems:[req.body]
   })
  }
  res.json(cart)
})