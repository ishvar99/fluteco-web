import {
 SET_CART_LOADING,
 ADD_TO_CART_SUCCESS,
 ADD_TO_CART_FAIL,
 SHOW_CART_MODAL,
 FETCH_CART_SUCCESS,
 FETCH_CART_FAIL,
 REMOVE_FROM_CART_FAIL,
 REMOVE_FROM_CART_SUCCESS
 } from "./types"
 import axios from "axios"
 const CART_URL='/api/v1/cart'
 export const addProductToCart=(productId,quantity)=>{
  return async (dispatch)=>{
   try{
    dispatch({type:SET_CART_LOADING})
    const response =await axios.post(CART_URL,JSON.stringify({product:productId,qty:quantity}))
    console.log(response.data);
    if(response.data.message==='Product limit exceeded'){
      dispatch({
        type:SHOW_CART_MODAL,
        payload:response.data
      })
    }
    dispatch({
     type: ADD_TO_CART_SUCCESS,
   })
   }catch(err){
    dispatch({
     type:ADD_TO_CART_FAIL,
     payload:err.response && err.response.data.error?err.response.data.error:err.message
    })
   }
  }
 }
 export const removeProductFromCart=(productId)=>{
  return async (dispatch)=>{
   try{
    dispatch({type:SET_CART_LOADING})
    const response =await axios.put(`${CART_URL}`,JSON.stringify({product:productId}))
    console.log(response.data);
    dispatch({
     type: REMOVE_FROM_CART_SUCCESS,
     payload:response.data
   })
   }catch(err){
    dispatch({
     type:REMOVE_FROM_CART_FAIL,
     payload:err.response && err.response.data.error?err.response.data.error:err.message
    })
   }
  }
 }
 export const fetchCart = () => {
  return async (dispatch) => {
    try {
      dispatch({type:SET_CART_LOADING})
      const response = await axios.get(CART_URL)
      console.log(response.data)
      dispatch({
        type: FETCH_CART_SUCCESS,
        payload: response.data,
      })
    } 
    catch (err) {
      console.log(err)
     console.log(err.response.data)
      dispatch({
        type: FETCH_CART_FAIL,
        payload: err.response && err.response.data.error?err.response.data.error:err.message,
      })
    }
  }
 }
 
 