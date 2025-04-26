import apiClient from "./apiClient";

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
}

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post<LoginResponse>("/auth/register", data);
  return response.data;
};
