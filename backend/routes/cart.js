const express = require("express")
const {
  displayCart, addToCart
} = require("../controllers/cart")
const { isLoggedin } = require("../middlewares/protect")

const router = express.Router()
router.route("/").get(isLoggedin,displayCart)
router.route("/").post(isLoggedin,addToCart)
module.exports = router
