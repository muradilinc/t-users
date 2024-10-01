import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi.ts';
import { User, UserMutation, UserUpdate } from '../../@types/users';

export const createUser = createAsyncThunk<void, UserMutation>(
  'users/create',
  async (userMutation) => {
    await axiosApi.post('/users', userMutation);
  }
);

export const getUsers = createAsyncThunk<User[]>(
  'users/getAll',
  async () => {
    const response = await axiosApi.get<User[]>('/users');
    if (!response) {
      return [];
    }

    return response.data;
  }
);

export const getSingleUser = createAsyncThunk<User, number>(
  'users/getOne',
  async (id) => {
    const response = await axiosApi.get(`/users/${id}`);
    return response.data;
  }
);

export const updateSingleUser = createAsyncThunk<void, UserUpdate>(
  'users/updateUser',
  async ({id, userMutation}) => {
    await axiosApi.patch(`/users/${id}`, userMutation);
  }
);