import {
 FETCH_PRODUCTS_SUCCESS,
 FETCH_PRODUCTS_FAIL,
 FETCH_PRODUCT_SUCCESS,
 FETCH_PRODUCT_FAIL,
 SET_AUTH_LOADING,
} from "../actions/types"
const initialState = {
 authLoading: false,
 products:[],
 product:{},
 error:''
}
export default (state = initialState, action) => {
 switch (action.type) {
   case SET_AUTH_LOADING: {
     return {
       ...state,
       authLoading: true,
     }
   }
   case FETCH_PRODUCTS_SUCCESS:
    {
    return {
     ...state,
     authLoading:false,
     products:action.payload,
    }
   }
   case FETCH_PRODUCT_SUCCESS:
    {
     console.log(action.payload);
    return {
     ...state,
     authLoading:false,
     product:action.payload,
    }
   }
   case FETCH_PRODUCTS_FAIL:
    case FETCH_PRODUCT_FAIL:{
      console.log(action.payload)
    return {
     ...state,
     authLoading:false,
     error:action.payload
    }
   }
   default:
     return state
 }
}
