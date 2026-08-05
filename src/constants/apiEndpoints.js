// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: "login",
//     REGISTER: "register",
//     LOGOUT: "/auth/logout",
//     FORGOT_PASSWORD: "/auth/forgot-password",
//     RESET_PASSWORD: "/auth/reset-password",
//     VERIFY_EMAIL: "/auth/verify-email"
//   },
//   PRODUCTS: {
//     BASE: "/products",
//     CATEGORIES: "/products/categories",
//     FEATURED: "/products/featured",
//     NEW_ARRIVALS: "/products/new-arrivals",
//     SEARCH: "/products/search"
//   },
//   CART: {
//     BASE: "/cart",
//     ADD: "/cart/add",
//     UPDATE: "/cart/update",
//     REMOVE: "/cart/remove",
//     CLEAR: "/cart/clear"
//   },
//   ORDERS: {
//     BASE: "/orders",
//     MY_ORDERS: "/orders/my-orders",
//     CREATE: "/orders/create",
//     STATUS: "/orders/status"
//   },
//   USER: {
//     PROFILE: "/user/profile",
//     ADDRESSES: "/user/addresses",
//     PASSWORD: "/user/change-password"
//   },
//   ADMIN: {
//     ANALYTICS: "/admin/analytics",
//     USERS: "/admin/users"
//   }
// };


// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: "/login",
//     REGISTER: "/registration",
//     LOGOUT: "/logout",
//     FORGOT_PASSWORD: "/forgotpassword",
//     RESET_PASSWORD: "/resetpassword",
//     VERIFY_EMAIL: "/verifyemail"
//   },
//   PRODUCTS: {
//     BASE: "/products",
//     CATEGORIES: "/products/categories",
//     FEATURED: "/products/featured",
//     NEW_ARRIVALS: "/products/new-arrivals",
//     SEARCH: "/products/search"
//   },
//   CART: {
//     BASE: "/cart",
//     ADD: "/cart/add",
//     UPDATE: "/cart/update",
//     REMOVE: "/cart/remove",
//     CLEAR: "/cart/clear"
//   },
//   ORDERS: {
//     BASE: "/orders",
//     MY_ORDERS: "/orders/my-orders",
//     CREATE: "/orders/create",
//     STATUS: "/orders/status"
//   },
//   USER: {
//     PROFILE: "/user/profile",
//     ADDRESSES: "/user/addresses",
//     PASSWORD: "/changepassword"
//   },
//   ADMIN: {
//     ANALYTICS: "/admin/analytics",
//     USERS: "/admin/users"
//   }
// };


export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/registration",
    LOGOUT: "/logout",
    FORGOT_PASSWORD: "/forgotpassword",
    RESET_PASSWORD: "/resetpassword",
    VERIFY_EMAIL: "/verifyemail"
  },
  PRODUCTS: {
    BASE: "/allProduct",
    CATEGORIES: "/products/categories",
    FEATURED: "/products/featured",
    NEW_ARRIVALS: "/products/new-arrivals",
    SEARCH: "/products/search"
  },
  CART: {
    BASE: "/cart",
    ADD: "/cart/create",
    UPDATE: "/cart/update",
    REMOVE: "/cart",
    CLEAR: "/cart/clear"
  },
  ORDERS: {
    BASE: "/orders",
    MY_ORDERS: "/getOrder",
    CREATE: "/orders/create",
    STATUS: "/orders/status"
  },
  USER: {
    PROFILE: "/user/profile",
    ADDRESSES: "/user/addresses",
    PASSWORD: "/changepassword"
  },
  ADMIN: {
    ANALYTICS: "/admin/analytics",
    USERS: "/allusers"
  }
};