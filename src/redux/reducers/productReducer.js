import { ActionTypes } from "../contants/action-types";

// const loginInformation = {};
// const adminInformation = {};
// const categoryInformation = {};
// const productInformation = {};

const inititalState = {
  loginInformation: [],
  adminInformation: [],
  categoryInformation: [],
  productInformation: [],
  forgotInformation: [],
  userDetail:[],
  cartsDetails:[],
  currentCartId:[],
  wishlistInformation: []
}

export const loginReducer = (state = inititalState.loginInformation, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_STATUS:
      return { ...state, loginInfo: payload };
    case ActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminReducer = (state = inititalState.adminInformation, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADMIN_STATUS:
      return { ...state, adminInfo: payload };
    default:
      return state;
  }
};

export const categoryReducer = (
  state = inititalState.categoryInformation,
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
  state = inititalState.productInformation,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.PRODUCT_DATA:
      return { ...state, productInfo: payload };

    case ActionTypes.DELETE_PRODUCT:
      return {
        productInfo: state.product.filter(e => e.id !== payload.id)
      };
    default:
      return state;
  }
};

export const forgotReducer = (state = inititalState.forgotInformation, { type, payload }) => {
  switch (type) {
    case ActionTypes.FORGOT_PASSWORD:
      return { ...state, forgotInfo: payload };
    default:
      return state;
  }
};

export const userDetailReducer = (state = inititalState.userDetail, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_DETAIL:
      return { ...state, userInfo: payload };
    default:
      return state;
  }
};

export const cartsDetailReducer = (state = inititalState.cartsDetails, { type, payload }) => {
  switch (type) {
    case ActionTypes.CARTS_DETAIL:
      return { ...state, carts: payload };
    default:
      return state;
  }
};

export const cartIdReducer = (state = inititalState.currentCartId, { type, payload }) => {
  switch (type) {
    case ActionTypes.CART_ID:
      return { ...state, currentCartID: payload };
    default:
      return state;
  }
};

export const wishlistReducer = (state = inititalState.wishlistInformation, { type, payload }) => {
  switch (type) {
    case ActionTypes.WISHLIST_INFO:
      return { ...state, wishlistInfo: payload };
    default:
      return state;
  }
};
