import React, {useState} from 'react';
import {Photo} from '../../types';
import {API_URL} from '../../constants';
import Modal from '../Modal/Modal';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import {deletePhoto, fetchAllPhotos, fetchUserPhotos} from '../../store/photosThunks';
import {toast} from 'react-toastify';
import {selectDeletePhotoLoading} from '../../store/photosSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  photo: Photo;
}

const PhotoItem: React.FC<Props> = ({photo}) => {
  const {id} = useParams() as {id: string};
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeletePhotoLoading);
  const [showModal, setShowModal] = useState(false);
  const {pathname: location} = useLocation();

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePhotoDelete = async (photoId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данное фото?')) {
        await dispatch(deletePhoto(photoId)).unwrap();
        if(location === '/') {
          dispatch(fetchAllPhotos());
        } else {
          dispatch(fetchUserPhotos(id));
        }
        toast.success('Photo successfully delete');
      }
    } catch {
      toast.error('There was an error delete photo');
    }
  };

  return (
    <>
      <div className='card' style={{width: '275px'}}>
        <img src={`${API_URL}/${photo.photo}`} className="card-img-top" alt={photo.title}
             style={{height: '183px', cursor: 'pointer'}} onClick={() => setShowModal(true)}/>
        <div className='card-body d-flex flex-column'>
          <div className='flex-grow-1'>
            <h5 className='card-title' style={{cursor: 'pointer'}} onClick={() => setShowModal(true)}>{photo.title}</h5>
            {location === '/' && (
              <p className='mb-0'>By: <Link to={`/user/${photo.user._id}`}
                                            className='text-dark text-decoration-none'>{photo.user.displayName}</Link></p>
            )}
          </div>
          {(user?.role === 'admin' || (location !== '/' && user?._id === photo.user._id)) && (
            <div className='d-flex justify-content-center mt-3'>
              <button type="button" className="btn btn-danger" onClick={() => handlePhotoDelete(photo._id)}
                      disabled={deleteLoading ? deleteLoading === photo._id : false}>{deleteLoading && deleteLoading === photo._id && (
                <ButtonSpinner/>)}Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal show={showModal} onClose={() => closeModal()} photo={photo.photo}/>
    </>
  );
};

export default PhotoItem;