import React from "react"
import { Route, Switch } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
import Home from "../Home/Home"
import Register from "../Register/Register"
import Login from "../Login/Login"
import ForgotPassword from "../ForgotPassword/ForgotPassword"
import ResetPassword from "../ResetPassword/ResetPassword"
import ProductDetails from "../ProductDetails/ProductDetails"
import Cart from '../Cart/Cart'
const Routing = () => {
  // const auth = useSelector((state) => state.auth)
  // const {isAuthenticated } = auth
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/products/:id" component={ProductDetails}></Route>
      <Route exact path="/cart/:id?" component={Cart}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/password_reset" component={ForgotPassword}></Route>
      <Route
        exact
        path="/password_reset/:token"
        component={ResetPassword}
      ></Route>
    </Switch>
  )
}
export default Routing
