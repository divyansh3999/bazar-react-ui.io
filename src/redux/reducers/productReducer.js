import { ActionTypes } from "../contants/action-types";

const loginInformation = {};
const adminInformation = {};
const categoryInformation = {};
const productInformation = {};

export const loginReducer = (state = loginInformation, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_STATUS:
      return { ...state, loginInfo: payload };
    default:
      return state;
  }
};

export const adminReducer = (state = adminInformation, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADMIN_STATUS:
      return { ...state, adminInfo: payload };
    default:
      return state;
  }
};

export const categoryReducer = (
  state = categoryInformation,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.CATEGORY_DATA:
      return { ...state, cateInfo: payload };
    default:
      return state;
  }
};

export const productReducer = (
  state = productInformation,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.PRODUCT_DATA:
      return { ...state, productInfo: payload };
    case ActionTypes.PRODUCT_REMOVE_DATA:
      return {
        ...state,
        items: state.productInfo.product,
      };
    default:
      return state;
  }
};
