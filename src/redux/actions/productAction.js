import { ActionTypes } from "../contants/action-types";

export const loginStatus = (loginInfo) => {
  return {
    type: ActionTypes.LOGIN_STATUS,
    payload: loginInfo,
  };
};

export const adminStatus = (adminInfo) => {
  return {
    type: ActionTypes.ADMIN_STATUS,
    payload: adminInfo,
  };
};

export const categoryStatus = (categoryInfo) => {
  return {
    type: ActionTypes.CATEGORY_DATA,
    payload: categoryInfo,
  };
};

export const productData = (productInfo) => {
  return {
    type: ActionTypes.PRODUCT_DATA,
    payload: productInfo,
  };
};

export const forgotStatus = (passwordInfo) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD,
    payload: passwordInfo
  }
}

export const deleteProduct = (delInfo) => {
  return {
    type: ActionTypes.DELETE_PRODUCT,
    payload: delInfo
  }
}

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};

export const userInformation = (userDetail) => {
  return {
    type: ActionTypes.USER_DETAIL,
    payload: userDetail
  };
};

export const cartsInfomation = (cartDetail) => {
  return {
    type: ActionTypes.CARTS_DETAIL,
    payload: cartDetail
  };
};

export const cartsItemId = (cartID) => {
  return {
    type: ActionTypes.CART_ID,
    payload: cartID
  };
};

export const wishlistInformation = (wishlist) => {
  return {
    type: ActionTypes.WISHLIST_INFO,
    payload: wishlist
  };
};