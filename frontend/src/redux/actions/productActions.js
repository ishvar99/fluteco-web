import {
SET_PRODUCTS_LOADING,
SET_PRODUCT_LOADING,
FETCH_PRODUCTS_SUCCESS,
FETCH_PRODUCTS_FAIL,
FETCH_PRODUCT_FAIL,
FETCH_PRODUCT_SUCCESS
} from "./types"
import axios from "axios"
const FETCH_PRODUCTS_URL='/api/v1/products'
export const fetchProduct=(id)=>{
 console.log(id);
 return async (dispatch)=>{
  try{
   dispatch({type:SET_PRODUCT_LOADING,payload:true})
   const response =await axios.get(`/api/v1/products/${id}`)
   console.log(response.data);
   dispatch({
    type: FETCH_PRODUCT_SUCCESS,
    payload: response.data,
  })
  }catch(err){
   dispatch({
    type:FETCH_PRODUCT_FAIL,
    payload:err.response && err.response.data.error?err.response.data.error:err.message
   })
  }
 }
}
export const fetchProducts = () => {
 return async (dispatch) => {
   try {
     dispatch({type:SET_PRODUCTS_LOADING,payload:true})
     const response = await axios.get(FETCH_PRODUCTS_URL)
     dispatch({
       type: FETCH_PRODUCTS_SUCCESS,
       payload: response.data,
     })
   } catch (err) {
    console.log(err.response.data)
     dispatch({
       type: FETCH_PRODUCTS_FAIL,
       payload: err.response && err.response.data.error?err.response.data.error:err.message,
     })
   }
 }
}

