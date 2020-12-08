import {
 FETCH_PRODUCTS_SUCCESS,
 FETCH_PRODUCTS_FAIL,
 FETCH_PRODUCT_SUCCESS,
 FETCH_PRODUCT_FAIL,
 SET_PRODUCT_LOADING,
 SET_PRODUCTS_LOADING,
} from "../actions/types"
const initialState = {
 productLoading: false,
 productsLoading:false,
 products:[],
 product:{},
 error:''
}
export default (state = initialState, action) => {
 switch (action.type) {
   case SET_PRODUCT_LOADING: {
     return {
       ...state,
       productLoading: true,
     }
   }
   case SET_PRODUCTS_LOADING: {
    return {
      ...state,
      productsLoading: true,
    }
  }
   case FETCH_PRODUCTS_SUCCESS:
    {
    return {
     ...state,
     productsLoading:false,
     products:action.payload,
    }
   }
   case FETCH_PRODUCT_SUCCESS:
    {
     console.log(action.payload);
    return {
     ...state,
     productLoading:false,
     product:action.payload,
    }
   }
   case FETCH_PRODUCTS_FAIL:
    case FETCH_PRODUCT_FAIL:{
      console.log(action.payload)
    return {
     ...state,
     productLoading:false,
     productsLoading:false,
     error:action.payload
    }
   }
   default:
     return state
 }
}
