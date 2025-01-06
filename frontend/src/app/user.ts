export class User {
  constructor(
    // public id: string,
    public email: string,
    public password: string
  ) {}
}

export interface LoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    __v: number;
  };
  message: string;
}

export interface TodosResponse {
  color: string;
  description: string;
  title: string;
  userId: string;
  __v: number;
  _id: string;
}
