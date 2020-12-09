import {
 SET_CART_LOADING,
 FETCH_CART_FAIL,
 FETCH_CART_SUCCESS,
 ADD_TO_CART_FAIL,
 ADD_TO_CART_SUCCESS,
 SHOW_CART_MODAL,
 HIDE_CART_MODAL,
 UNSET_REDIRECT,
 REMOVE_FROM_CART_SUCCESS,
 REMOVE_FROM_CART_FAIL
} from "../actions/types"
const initialState = {
 cartLoading: false,
 cart:null,
 cartError:'',
 showModal:false,
 redirect:false
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
      redirect:true
    }
   }
   case REMOVE_FROM_CART_SUCCESS:{
     return {
       ...state,
       cartLoading:false,
       cart:action.payload
     }
   }
   case UNSET_REDIRECT:{
     return {
       ...state,
       redirect:false
     }
   }
   case ADD_TO_CART_FAIL:
     case REMOVE_FROM_CART_FAIL:{
    return {
      ...state,
      cartLoading:false,
      cartError:action.payload
    }
   }
   case FETCH_CART_SUCCESS:{
     console.log(action.payload);
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
