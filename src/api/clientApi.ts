import { Client } from "../types/client";
import apiClient from "./apiClient";

export const getClients = async () => {
  const response = await apiClient.get<Client[]>("/clients");
  return response.data;
};

export const getClient = async (id: string) => {
  const response = await apiClient.get<Client>(`/clients/${id}`);
  return response.data;
};

export const createClient = async (data: Omit<Client, "id">) => {
  const response = await apiClient.post<Client>("/clients", data);
  return response.data;
};

export const updateClient = async (id: string, data: Partial<Client>) => {
  const response = await apiClient.put<Client>(`/clients/${id}`, data);
  return response.data;
};

export const deleteClient = async (id: string) => {
  await apiClient.delete(`/clients/${id}`);
};
