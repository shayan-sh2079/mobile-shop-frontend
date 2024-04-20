// COOKIES
export const ATK = "access_token";
export const RTK = "refresh_token";
export const REFRESH_TKN_TIME = 7 * 24 * 60 * 60 * 1000; // 7 DAYS
export const ACCESS_TKN_TIME = 60 * 60 * 1000; // 1 HOUR

// MESSAGES
export const FAIL_MSG = "Something went wrong";
export const SUCCESS_MSG = "Successful";

// LOCAL STORAGE
export const ANON_CART = "anonymous_cart_items";
export const CART = "cart_items";

// REGEXES
export const PASS_RGX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EMAIL_RGX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
