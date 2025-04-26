export const USER_KEY = 'user=';
export const MY_CART = 'myCart';
export const VALIDATION_MSG: {
    [key: string]: string | ((error: any) => string);
} = {
    required: 'This field is required.',
    maxlength: (error: any) => `Maximum length is ${error.requiredLength} characters.`,
    minlength: (error: any) => `Minimum length is ${error.requiredLength} characters.`,
    pattern: 'Invalid format.',
    email: 'Invalid email address.',
    passwordMismatch: 'Passwords do not match.'
};
export const LOGIN_API = 'http://127.0.0.1:8000/api/login';
export const LOGOUT_API = 'http://127.0.0.1:8000/api/logout';
export const REGIST_API = 'http://127.0.0.1:8000/api/register';
export const FOODLIST_API = 'http://127.0.0.1:8000/api/foods';
export const TAGS_API = 'http://127.0.0.1:8000/api/tags';
export const ORDERSAVE_API = 'http://127.0.0.1:8000/api/ordersave';
export const ORDERDETAIL_API = 'http://127.0.0.1:8000/api/orderhistory';
export const TOKEN_API = 'http://127.0.0.1:8000/api/updatetoken';
export const SESSION_DURATION = 600000; //  in milliseconds