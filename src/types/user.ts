export interface User {
  id: string;
  name: string;
  email?: string;
  firebaseToken?: string;
  createdAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email?: string;
}