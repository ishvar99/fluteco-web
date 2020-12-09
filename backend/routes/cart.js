const express = require("express")
const {
  displayCart, addToCart, removeFromCart,updateCart
} = require("../controllers/cart")
const { isLoggedin } = require("../middlewares/protect")

const router = express.Router()
router.route("/").get(isLoggedin,displayCart)
router.route("/").post(isLoggedin,addToCart)
router.route("/").put(isLoggedin,removeFromCart)
router.route('/quantity').put(isLoggedin,updateCart)
module.exports = router
