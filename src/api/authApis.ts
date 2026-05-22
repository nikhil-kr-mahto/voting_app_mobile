import NetInfo from '@react-native-community/netinfo';
import apiClient from './client';
import { Routes } from './routes';

export const loginApi = async (email: string, password: string) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }

  try {
    const response = await apiClient.post(Routes.login, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const searchApi = async (query: string, page: number = 1) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }

  try {
    const response = await apiClient.get(Routes.search, { params: { search: query, page } });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const updateVoterStatus = async (id: string) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }

  try {
    const response = await apiClient.put(`${Routes.updateStatus}/${id}`, { status: 'polled' });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const registerUser = async (data: object) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    const response = await apiClient.post(Routes.signup, data);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 422) {
      let errors = error?.response?.data?.errors;
      throw new Error(errors);
    } else {
      throw new Error(error?.response?.data?.message ?? 'Something went wrong');
    }
  }
};
