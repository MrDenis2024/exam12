import React, {useState} from 'react';
import {PhotoMutation} from '../../types';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useAppSelector} from '../../app/hooks';
import {selectCreateLoading} from '../../store/photosSlice';

interface Props {
  onSubmit: (photo: PhotoMutation) => void;
}

const PhotoForm: React.FC<Props> = ({onSubmit}) => {
  const loading = useAppSelector(selectCreateLoading);
  const [photo, setPhoto] = useState<PhotoMutation>({
    title: '',
    photo: null,
  });

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setPhoto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setPhoto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...photo});
  };

  return (
    <form className='mt-5 w-75 mx-auto border rounded-4 border-2 p-4' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new photo</h4>
      <div className="form-group mb-3">
        <label htmlFor="title" className="mb-1">Title:</label>
        <input type="text" name="title" id="title" className="form-control" value={photo.title}
               onChange={inputChangeHandler} required/>
      </div>
      <FileInput onChange={fileInputChangeHandler}/>
      <div className="d-flex">
        <button type="submit" className="btn btn-success ms-auto" disabled={loading}>{loading && <ButtonSpinner/>}Save
          photo
        </button>
      </div>
    </form>
  );
};

export default PhotoForm;