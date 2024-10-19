import React from 'react';
import {User} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../store/usersThunks';
import {NavLink} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle btn btn-success d-flex align-items-center p-0" data-bs-toggle="dropdown">
        Hello, {user.displayName}
      </button>
      <ul className="dropdown-menu">
        <li><NavLink to="/user/:id" className="dropdown-item">{user.displayName} gallery</NavLink></li>
        <li><NavLink to='/new-photo' className="dropdown-item">Add new photo</NavLink></li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;