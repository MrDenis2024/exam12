import React, {useState} from 'react';
import {Photo} from '../../types';
import {API_URL} from '../../constants';
import Modal from '../Modal/Modal';
import {Link} from 'react-router-dom';

interface Props {
  photo: Photo;
}

const PhotoItem: React.FC<Props> = ({photo}) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='card'>
        <img src={`${API_URL}/${photo.photo}`} className="card-img-top" alt={photo.title}
             style={{width: '275px', height: '183px', cursor: 'pointer'}} onClick={() => setShowModal(true)}/>
        <div className='card-body'>
          <h5 className='card-title' style={{cursor: 'pointer'}} onClick={() => setShowModal(true)}>{photo.title}</h5>
          <p className='mb-0'>By: <Link to={`/user/${photo.user._id}`}
                                        className='text-dark text-decoration-none'>{photo.user.displayName}</Link></p>
        </div>
      </div>
      <Modal show={showModal} onClose={() => closeModal()} photo={photo.photo}/>
    </>
  );
};

export default PhotoItem;