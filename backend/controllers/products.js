const asyncHandler = require('../middlewares/asyncHandler')
const Product=require('../models/product')
exports.getProducts=asyncHandler(async (req,res)=>{
 const products=await Product.find({})
 res.json(products)
})
exports.getProduct=asyncHandler(async(req,res)=>{
 const product=await Product.findById(req.params.id)
 if(product)
 res.json(product)
 else{
 return next(new ErrorResponse("Product not found", 404))
 }
})