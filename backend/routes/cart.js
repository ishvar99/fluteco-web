const express = require("express")
const {
  displayCart, addToCart, removeFromCart
} = require("../controllers/cart")
const { isLoggedin } = require("../middlewares/protect")

const router = express.Router()
router.route("/").get(isLoggedin,displayCart)
router.route("/").post(isLoggedin,addToCart)
router.route("/").put(isLoggedin,removeFromCart)
module.exports = router
