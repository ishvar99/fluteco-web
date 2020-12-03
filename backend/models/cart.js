const mongoose =require('mongoose')

let cartSchema=new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:'User'
 },
 cartItems:
 [
  {
   // _id:false,
  product:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:'Product'
  },
  qty:{
   type:Number,
   required:true,
  }
 }
 ]
})

module.exports=mongoose.model('cart',cartSchema,'cart');