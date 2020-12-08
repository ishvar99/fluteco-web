import {
 SET_CART_LOADING,
 FETCH_CART_FAIL,
 FETCH_CART_SUCCESS,
 ADD_TO_CART_FAIL,
 ADD_TO_CART_SUCCESS,
 SHOW_CART_MODAL,
 HIDE_CART_MODAL
} from "../actions/types"
const initialState = {
 cartLoading: false,
 cart:[],
 cartError:'',
 showModal:false
}
export default (state = initialState, action) => {
 switch (action.type) {
   case SET_CART_LOADING: {
     return {
       ...state,
       cartLoading: true,
     }
   }
   case SHOW_CART_MODAL:{
     return {
       ...state,
       showModal:true
     }
   }
   case HIDE_CART_MODAL:{
    return {
      ...state,
      showModal:false
    }
  }
   case ADD_TO_CART_SUCCESS:{
    return {
      ...state,
      cartLoading:false,
    }
   }
   case ADD_TO_CART_FAIL:{
    return {
      ...state,
      cartLoading:false,
      cartError:action.payload
    }
   }
   case FETCH_CART_SUCCESS:{
    return {
      ...state,
      cartLoading:false,
      cart:action.payload
    }
   }
   case FETCH_CART_FAIL:{
    return {
      ...state,
      cartLoading:false,
      cartError:action.payload
    }
   }
   default:
     return state
 }
}
