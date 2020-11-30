import {
 SET_LOADING,
} from "../actions/types"
const initialState = {
 loading: false,
 cart:[],
 error:''
}
export default (state = initialState, action) => {
 switch (action.type) {
   case SET_LOADING: {
     return {
       ...state,
       loading: true,
     }
   }
   default:
     return state
 }
}
