export interface User {
    id: string;
    email: string;
}
  
export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    category: string;
    coverImage?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}
  
export interface BookFormData {
    title: string;
    author: string;
    description: string;
    category: string;
    coverImage?: string;
}
  
export interface AuthResponse {
    token: string;
    user: User;
}
  
export interface LoginCredentials {
    email: string;
    password: string;
}
  
export interface RegisterCredentials extends LoginCredentials {
    confirmPassword: string;
}