export interface iLoginInfo {
  email: string;
  password: string;
}

export interface iUserInfo {
  email: string;
  displayName: string;
  career: string;
  profile: string;
}

export interface SignUpInfo extends iUserInfo {
  password: string;
}
