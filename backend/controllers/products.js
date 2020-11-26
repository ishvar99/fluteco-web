const products=require('../data/products')

exports.getProducts=(req,res)=>{
 res.json(products)
}
exports.getProduct=(req,res)=>{
 const product =products.find(p=>p._id===req.params.id);
 res.json(product);
}