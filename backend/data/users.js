const bcrypt=require('bcryptjs')
const users=[
 {
  name:'admin',
  email:'admin@fluteco.com',
  password:'admin_fluteco',
  confirmed:true,
  role:2
 }
]
module.exports=users