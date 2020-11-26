const asyncHandler = require('../middlewares/asyncHandler')
const Product=require('../models/product')
exports.getProducts=asyncHandler(async (req,res)=>{
 const products=await Product.find({})
 throw new Error('some error')
 res.json(products)
})
exports.getProduct=asyncHandler(async(req,res)=>{
 const product=await Product.findById(req.params.id)
 console.log(product)
 if(product)
 res.json(product)
 else{
 return next(new ErrorResponse("Product not found", 404))
 }
})