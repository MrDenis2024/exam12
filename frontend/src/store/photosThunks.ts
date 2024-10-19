import {createAsyncThunk} from '@reduxjs/toolkit';
import {Photo} from '../types';
import axiosApi from '../axiosApi';

export const fetchAllPhotos = createAsyncThunk<Photo[], void>('photos/fetchAll', async () => {
  const {data: photos} = await axiosApi.get<Photo[]>('/photos');
  return photos;
});