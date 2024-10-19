import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {PhotoMutation} from '../../types';
import {createPhoto} from '../../store/photosThunks';
import {toast} from 'react-toastify';
import PhotoForm from '../../components/Forms/PhotoForm';

const NewPhoto = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFormSubmit = async (photo: PhotoMutation) => {
    try {
      await dispatch(createPhoto(photo)).unwrap();
      navigate('/');
      toast.success('Photo successfully created');
    } catch {
      toast.error('Error creating Photo');
    }
  };

  return (
    <div>
      <PhotoForm onSubmit={onFormSubmit} />
    </div>
  );
};

export default NewPhoto;