import { combineReducers } from "redux";
import { adminReducer, loginReducer, categoryReducer, productReducer } from "./productReducer";

const reducers = combineReducers({
   loginDetails: loginReducer,
   adminDetails: adminReducer, 
   categoryDetails: categoryReducer,
   productDetails: productReducer
})

export default reducers;