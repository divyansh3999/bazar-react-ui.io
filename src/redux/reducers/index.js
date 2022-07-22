import { combineReducers } from "redux";
import { adminReducer, loginReducer, categoryReducer, productReducer, forgotReducer, userDetailReducer, cartsDetailReducer, cartIdReducer, wishlistReducer } from "./productReducer";

const reducers = combineReducers({
   loginDetails: loginReducer,
   adminDetails: adminReducer, 
   categoryDetails: categoryReducer,
   productDetails: productReducer,
   forgotPassword: forgotReducer,
   userDetails: userDetailReducer,
   cartsDetails: cartsDetailReducer,
   currentCartId: cartIdReducer,
   wishlistInfo: wishlistReducer
})

export default reducers;