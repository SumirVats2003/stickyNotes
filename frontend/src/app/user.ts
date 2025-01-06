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

export interface Todos {
  color: string;
  description: string;
  title: string;
  userId: string;
}

export interface TodosResponse {
  message: string;
  newNote: {
    color: string;
    description: string;
    title: string;
    userId: string;
  };
}
