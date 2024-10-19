import {createSlice} from '@reduxjs/toolkit';
import {Photo, UserPhoto} from '../types';
import {createPhoto, deletePhoto, fetchAllPhotos, fetchUserPhotos} from './photosThunks';

export interface PhotosState {
  photos: Photo[];
  usersPhoto: UserPhoto | null;
  usersPhotoLoading: boolean;
  fetchAllLoading: boolean;
  deletePhotoLoading: false | string;
  createLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  usersPhoto: null,
  usersPhotoLoading: false,
  fetchAllLoading: false,
  deletePhotoLoading: false,
  createLoading: false,
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

    builder.addCase(createPhoto.pending, (state: PhotosState) => {
      state.createLoading = true;
    }).addCase(createPhoto.fulfilled, (state: PhotosState) => {
      state.createLoading = false;
    }).addCase(createPhoto.rejected, (state: PhotosState) => {
      state.createLoading = false;
    });

    builder.addCase(deletePhoto.pending, (state: PhotosState, {meta: {arg: photo}}) => {
      state.deletePhotoLoading = photo;
    }).addCase(deletePhoto.fulfilled, (state: PhotosState) => {
      state.deletePhotoLoading = false;
    }).addCase(deletePhoto.rejected, (state: PhotosState) => {
      state.deletePhotoLoading = false;
    });
  },
  selectors: {
    selectPhotos: (state: PhotosState) => state.photos,
    selectFetchAllLoading: (state: PhotosState) => state.fetchAllLoading,
    selectUsersPhoto: (state: PhotosState) => state.usersPhoto,
    selectUsersPhotoLoading: (state: PhotosState) => state.usersPhotoLoading,
    selectDeletePhotoLoading: (state: PhotosState) => state.deletePhotoLoading,
    selectCreateLoading: (state: PhotosState) => state.createLoading,
  },
});

export const photosReducer = photosSlice.reducer;
export const {
  selectPhotos,
  selectUsersPhoto,
  selectUsersPhotoLoading,
  selectFetchAllLoading,
  selectDeletePhotoLoading,
  selectCreateLoading,
} = photosSlice.selectors;