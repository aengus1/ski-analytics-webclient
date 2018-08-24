/**
 * interface used for sign in
 */
export interface Authenticate {
  username: string;
  password: string;
}

/**
 * interface used for sign up
 */
export interface SignupUser {
  username: string;
  password: string;
  confirmCode: string;
  firstName: string;
  lastName: string;
}

/**
 * interface used for confirming sign up
 */
export interface ConfirmUser {
  username: string;
  confirmCode: string;
}

/**
 * interface used for resetting password
 */
export interface ResetPasswordUser {
  username: string;
  confirmCode: string;
  password: string;
}

/**
 * interface used on login success
 */
export interface User {
  username: string;
  signInUserSession: any;
}
