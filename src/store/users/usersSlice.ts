import { User } from '../../@types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser, getSingleUser, getUsers, updateSingleUser } from './usersThunk.ts';
import { RootState } from '../../app/store/store.ts';

interface UsersState {
  users: User[];
  user: User | null;
  usersLoading: boolean;
  userLoading: boolean;
  createUserLoading: boolean;
  updateUserLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  user: null,
  usersLoading: false,
  userLoading: false,
  createUserLoading: false,
  updateUserLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.createUserLoading = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.createUserLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, {payload: data}: PayloadAction<User[]>) => {
      state.usersLoading = false;
      state.users = data;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.usersLoading = false;
    });
    builder.addCase(getSingleUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getSingleUser.fulfilled, (state, {payload: data}: PayloadAction<User>) => {
      state.userLoading = false;
      state.user = data;
    });
    builder.addCase(getSingleUser.rejected, (state) => {
      state.userLoading = false;
    });
    builder.addCase(updateSingleUser.pending, (state) => {
      state.updateUserLoading = true;
    });
    builder.addCase(updateSingleUser.fulfilled, (state) => {
      state.updateUserLoading = false;
    });
    builder.addCase(updateSingleUser.rejected, (state) => {
      state.updateUserLoading = false;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const selectUsers = (state: RootState) => state.users.users;
export const selectUser = (state: RootState) => state.users.user;
export const selectUserLoading = (state: RootState) => state.users.userLoading;