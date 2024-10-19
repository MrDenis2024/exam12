import {createSlice} from '@reduxjs/toolkit';
import {Photo} from '../types';
import {fetchAllPhotos} from './photosThunks';

export interface PhotosState {
  photos: Photo[];
  fetchAllLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
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
  },
  selectors: {
    selectPhotos: (state: PhotosState) => state.photos,
    selectFetchAllLoading: (state: PhotosState) => state.fetchAllLoading,
  },
});

export const photosReducer = photosSlice.reducer;
export const {
  selectPhotos,
  selectFetchAllLoading,
} = photosSlice.selectors;