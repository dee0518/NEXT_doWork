export interface iUserInfo {
  id: string;
  email: string;
  name: string;
  career: string;
  profile: string | ArrayBuffer;
  introduce: string;
  provider?: string;
}

export interface iSignUpInfo extends iUserInfo {
  password: string;
}

export type iLoginInfo = Pick<iSignUpInfo, 'email' | 'password'>;
export type iEditUserInfo = Omit<iUserInfo, 'id' | 'email'>;

export type iDefaultUserInfo = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  labelClass: string;
  labelChildren: string;
  error: string;
};

export type AuthType = iLoginInfo | iSignUpInfo | iEditUserInfo;
export type AuthError = {
  id: string;
  message: string;
};
