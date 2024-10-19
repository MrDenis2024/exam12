import {createSlice} from '@reduxjs/toolkit';
import {Photo, UserPhoto} from '../types';
import {fetchAllPhotos, fetchUserPhotos} from './photosThunks';

export interface PhotosState {
  photos: Photo[];
  usersPhoto: UserPhoto | null;
  usersPhotoLoading: boolean;
  fetchAllLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  usersPhoto: null,
  usersPhotoLoading: false,
  fetchAllLoading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPhotos.pending, (state: PhotosState) => {
      state.fetchAllLoading = true;
    }).addCase(fetchAllPhotos.fulfilled, (state: PhotosState, {payload: photos}) => {
      state.fetchAllLoading = false;
      state.photos = photos;
    }).addCase(fetchAllPhotos.rejected, (state: PhotosState) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchUserPhotos.pending, (state: PhotosState) => {
      state.usersPhoto = null;
      state.usersPhotoLoading = true;
    }).addCase(fetchUserPhotos.fulfilled, (state: PhotosState, {payload: photos}) => {
      state.usersPhoto = photos;
      state.usersPhotoLoading = false;
    }).addCase(fetchUserPhotos.rejected, (state: PhotosState) => {
      state.usersPhotoLoading = false;
    });
  },
  selectors: {
    selectPhotos: (state: PhotosState) => state.photos,
    selectFetchAllLoading: (state: PhotosState) => state.fetchAllLoading,
    selectUsersPhoto: (state: PhotosState) => state.usersPhoto,
    selectUsersPhotoLoading: (state: PhotosState) => state.usersPhotoLoading,
  },
});

export const photosReducer = photosSlice.reducer;
export const {
  selectPhotos,
  selectUsersPhoto,
  selectUsersPhotoLoading,
  selectFetchAllLoading,
} = photosSlice.selectors;