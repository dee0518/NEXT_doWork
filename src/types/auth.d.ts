export interface iUserInfo {
  email: string;
  displayName: string;
  career: string;
  profile: string;
}

export interface iSignUpInfo extends iUserInfo {
  password: string;
}

export type iLoginInfo = Pick<iSignUpInfo, 'email' | 'password'>;

export type iDefaultUserInfo = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  labelClass: string;
  labelChildren: string;
  error: string;
};

export type AuthType = iLoginInfo | iSignUpInfo;
export type AuthError = {
  id: string;
  message: string;
};
