// src/services/authService.ts
import api from './api';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // TODO: à remplacer par un appel réel quand l'API sera disponible
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: credentials.email,
      },
    };

    await new Promise((resolve) => setTimeout(resolve, 500)); // simule un délai
    return mockResponse;

    // Version réelle (à décommenter quand le back sera prêt)
    // const response = await api.post<AuthResponse>('/auth/login', credentials);
    // return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: credentials.email,
      },
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse;

    // Version réelle
    // const response = await api.post<AuthResponse>('/auth/register', credentials);
    // return response.data;
  },
};
