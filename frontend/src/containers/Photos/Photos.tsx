import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchAllLoading, selectPhotos} from '../../store/photosSlice';
import {fetchAllPhotos} from '../../store/photosThunks';
import PhotoItem from '../../components/Photo/PhotoItem';
import Spinner from '../../components/Spinner/Spinner';

const Photos = () => {
  const dispatch = useAppDispatch();
  const allPhotos = useAppSelector(selectPhotos);
  const fetchPhotosLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);

  return (
    <div className='my-4'>
      {fetchPhotosLoading && <div className='text-center mt-5'><Spinner /></div>}
      {allPhotos.length > 0 && (
        <div className='d-flex gap-4 flex-wrap'>
          {allPhotos.map((photo) => (
            <PhotoItem key={photo._id} photo={photo} />
          ))}
        </div>
      )}
      {!fetchPhotosLoading && allPhotos.length === 0 && <h3 className='text-center'>No photos</h3>}
    </div>
  );
};

export default Photos;