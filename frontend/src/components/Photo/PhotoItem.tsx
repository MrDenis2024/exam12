import React from 'react';
import {Photo} from '../../types';
import {API_URL} from '../../constants';

interface Props {
  photo: Photo;
}

const PhotoItem: React.FC<Props> = ({photo}) => {
  return (
    <div className='card'>
      <img src={`${API_URL}/${photo.photo}`} className="card-img-top" alt={photo.title}
           style={{width: '275px', height: '183px'}}/>
      <div className='card-body'>
        <h5 className='card-title'>{photo.title}</h5>
        <span>By: {photo.user.displayName}</span>
      </div>
    </div>
  );
};

export default PhotoItem;