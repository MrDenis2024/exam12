import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo, PhotoMutation, UserPhoto} from '../types';
import axiosApi from '../axiosApi';

export const fetchAllPhotos = createAsyncThunk<Photo[], void>('photos/fetchAll', async () => {
  const {data: photos} = await axiosApi.get<Photo[]>('/photos');
  return photos;
});

export const fetchUserPhotos = createAsyncThunk<UserPhoto, string>('photos/fetchUsersPhotos', async (id: string) => {
  const {data: photos} = await axiosApi.get<UserPhoto>(`/photos?user=${id}`);
  return photos;
});

export const createPhoto = createAsyncThunk<void, PhotoMutation>('photos/create', async (photoMutation) => {
  const formData = new FormData();
  formData.append('title', photoMutation.title);
  if(photoMutation.photo) {
    formData.append('photo', photoMutation.photo);
  }

  await axiosApi.post('/photos', formData);
});

export const deletePhoto = createAsyncThunk<void, string>('photos/delete', async (id) => {
  await axiosApi.delete(`/photos/${id}`);
});