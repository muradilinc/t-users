export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserMutation {
  name: string,
  username: string,
  email: string,
  phone: string,
}

export interface UserUpdate {
  id: number,
  userMutation: UserMutation
}