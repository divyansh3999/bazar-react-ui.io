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

export const removeProduct = (items) => {
  return {
    type: ActionTypes.PRODUCT_REMOVE_DATA,
    payload: items
  };
};