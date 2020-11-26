import {
 FETCH_PRODUCTS_SUCCESS,
 FETCH_PRODUCTS_FAIL,
 SET_LOADING,
} from "../actions/types"
const initialState = {
 loading: false,
 products:[],
 error:null
}
export default (state = initialState, action) => {
 switch (action.type) {
   case SET_LOADING: {
     return {
       ...state,
       loading: true,
     }
   }
   case FETCH_PRODUCTS_SUCCESS:{
    return {
     ...state,
     loading:false,
     products:action.payload
    }
   }
   case FETCH_PRODUCTS_FAIL:{
    return {
     ...state,
     loading:false,
     error:action.payload
    }
   }
   default:
     return state
 }
}
