import apiClient from "./apiClient";
import { Client, ClientFormData } from "../types/client";

export const getClients = async (): Promise<Client[]> => {
  const response = await apiClient.get<Client[]>("/clients");
  return response.data;
};

export const getClient = async (id: string): Promise<Client> => {
  const response = await apiClient.get<Client>(`/clients/${id}`);
  return response.data;
};

export const createClient = async (data: ClientFormData): Promise<Client> => {
  const response = await apiClient.post<Client>("/clients", data);
  return response.data;
};

export const updateClient = async (
  id: string,
  data: Partial<ClientFormData>
): Promise<Client> => {
  const response = await apiClient.put<Client>(`/clients/${id}`, data);
  return response.data;
};

export const deleteClient = async (id: string): Promise<void> => {
  await apiClient.delete(`/clients/${id}`);
};
