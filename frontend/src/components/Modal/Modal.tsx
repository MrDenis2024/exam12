import React, {MouseEventHandler} from 'react';
import {API_URL} from '../../constants';

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: MouseEventHandler;
  photo: string;
}

const Modal: React.FC<Props> = ({show, onClose, photo}) => {
  return (
    <>
      <div className='modal-backdrop show' style={{display: show ? 'block' : 'none'}}/>
      <div className='modal show' style={{ display: show ? 'block' : 'none'}} onClick={onClose}>
        <div className='modal-dialog h-75' style={{maxWidth: "70%"}} onClick={(event) => event.stopPropagation()}>
          <div className='modal-content h-100 d-flex flex-column'>
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body flex-grow-1 overflow-hidden">
              <img className='w-100 h-100' src={`${API_URL}/${photo}`} alt={photo} />
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-danger" onClick={onClose} >Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;