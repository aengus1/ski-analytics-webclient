export interface Authenticate {
  username: string;
  password: string;
}

export interface SignupUser {
  username: string;
  password: string;
  confirmCode: string;
  firstName: string;
  lastName: string;
}

export interface ConfirmUser {
  username: string;
  confirmCode: string;
}

export interface ResetPasswordUser {
  username: string;
  confirmCode: string;
  password: string;
}
export interface User {
  name: string;
}
