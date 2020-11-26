import {
SET_LOADING,
FETCH_PRODUCTS_SUCCESS,
FETCH_PRODUCTS_FAIL
} from "./types"
import axios from "axios"
const FETCH_PRODUCTS_URL='/api/v1/products'
export const fetchProducts = () => {
 console.log('executed')
 return async (dispatch) => {
   try {
     dispatch({type:SET_LOADING})
     const response = await axios.get(FETCH_PRODUCTS_URL)
     dispatch({
       type: FETCH_PRODUCTS_SUCCESS,
       payload: response.data,
     })
   } catch (err) {
     dispatch({
       type: FETCH_PRODUCTS_FAIL,
       payload: err.response.data.error,
     })
   }
 }
}

