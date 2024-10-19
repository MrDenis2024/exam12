import {NavLink} from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <div className='d-flex flex-row gap-3 flex-nowrap'>
      <NavLink to="/register" className='btn btn-success'>Register</NavLink>
      <NavLink to="/login" className='btn btn-success'>Login</NavLink>
    </div>
  );
};

export default AnonymousMenu;