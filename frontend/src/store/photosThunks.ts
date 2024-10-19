import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo, UserPhoto} from '../types';
import axiosApi from '../axiosApi';

export const fetchAllPhotos = createAsyncThunk<Photo[], void>('photos/fetchAll', async () => {
  const {data: photos} = await axiosApi.get<Photo[]>('/photos');
  return photos;
});

export const fetchUserPhotos = createAsyncThunk<UserPhoto, string>('photos/fetchUsersPhotos', async (id: string) => {
  const {data: photos} = await axiosApi.get<UserPhoto>(`/photos?user=${id}`);
  return photos;
});

export const deletePhoto = createAsyncThunk<void, string>('photos/delete', async (id) => {
  await axiosApi.delete(`/photos/${id}`);
});