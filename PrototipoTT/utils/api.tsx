import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Enum de operaciones HTTP
export enum Operation {
  GET = 'GET',
  FIND = 'FIND',
  SAVE = 'POST',
  PUT = 'PUT',
  UPDATE = 'PATCH',
  DELETE = 'DELETE',
}

export const HOST = 'http://localhost:8000/api';
const LOGINPATH = `${HOST}/user/login`;

const API: AxiosInstance = axios.create({
  baseURL: HOST,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});


export async function login(email: string, password: string): Promise<AxiosResponse> {
  return await API.post(LOGINPATH, { email, password });
}


interface ProcessParams {
  id?: string | number;
  queries?: Record<string, any>;
  limit?: number;
  skip?: number;
}

export async function process<T = any>(
  operation: Operation,
  model: string,
  payload: Record<string, any> = {},
  params: ProcessParams = {}
): Promise<AxiosResponse<T> | null> {
  const { id } = params;

  const token = await AsyncStorage.getItem('token');
  const oAuth = {
    headers: {
      Accept: '*/*',
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      Authorization:`Bearer asdas`,
    },
  };

  switch (operation) {
    case Operation.FIND:
      return await API.get<T>(`/${model}`, oAuth);
    case Operation.SAVE:
      return await API.post<T>(`/${model}`, payload, oAuth);
    case Operation.PUT:
      return await API.put<T>(`/${model}`, payload, oAuth);
    case Operation.UPDATE:
      if (!id) throw new Error('ID requerido para UPDATE');
      return await API.patch<T>(`/${model}/${id}`, payload, oAuth);
    case Operation.DELETE:
      if (!id) throw new Error('ID requerido para DELETE');
      return await API.delete<T>(`/${model}/${id}`, oAuth);
    default:
      return null;
  }
}