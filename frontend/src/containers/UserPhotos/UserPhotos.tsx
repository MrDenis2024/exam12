import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUsersPhoto, selectUsersPhotoLoading} from '../../store/photosSlice';
import {useEffect} from 'react';
import {fetchUserPhotos} from '../../store/photosThunks';
import Spinner from '../../components/Spinner/Spinner';
import PhotoItem from '../../components/Photo/PhotoItem';

const UserPhotos = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const userPhotos = useAppSelector(selectUsersPhoto);
  const userPhotosLoading = useAppSelector(selectUsersPhotoLoading);

  useEffect(() => {
    dispatch(fetchUserPhotos(id));
  }, [dispatch, id]);

  return (
    <div className='my-4'>
      {userPhotosLoading && <div className='text-center mt-5'><Spinner/></div>}
      {userPhotos && (
        <>
          <h2 className="mt-4 mb-4">{userPhotos.user.displayName} gallery</h2>
          {userPhotos.photos.length > 0 ? (
            <div className="d-flex gap-4 flex-wrap">
              {userPhotos.photos.map((photo) => (
                <PhotoItem key={photo._id} photo={photo}/>
              ))}
            </div>
          ) : (
            <h3 className="text-center">This user has no photos added yet</h3>
          )}
        </>
      )}
      {!userPhotosLoading && !userPhotos && <h3 className='text-center'>There is no such user</h3>}
    </div>
  );
};

export default UserPhotos;