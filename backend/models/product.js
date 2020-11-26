const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema(
 {
  name:{
   type:String,
   required:true,
  },
  rating:{
   type:Number,
   required:true
  },
  comment:{
   type:String,
   required:true
  }
 },
 {timestamps:true}
)
const productSchema = new mongoose.Schema(
 {
  user:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'User'
  },
   name: {
     type: String,
     required: [true, "Please provide a name"],
   },
   image: {
     type: String,
     required: [true, "Please provide an image"],
   },
   brand: {
     type: String,
     required: [true, "Please provide a brand"]
   },
   category: {
     type: String,
     required:true,
     default:false
   },
   description:{
    type:String,
    required:true
   },
   rating:{
    type:Number,
    required:true,
    default:0
   },
   numReviews:{
    type:Number,
    required:true,
    default:0
   },
   price:{
    type:Number,
    required:true,
    default:0
   },
   countInStock:{
    type:Number,
    required:true,
    default:0
   },
   reviews:[reviewSchema]
 },
 { timestamps: true }
)

module.exports=mongoose.model('Product',productSchema)
