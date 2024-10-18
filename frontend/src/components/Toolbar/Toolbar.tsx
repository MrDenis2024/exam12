import {NavLink} from 'react-router-dom';

const Toolbar = () => {

  return (
    <nav className='navbar navbar-dark bg-success'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>Test</NavLink>
      </div>
    </nav>
  );
};

export default Toolbar;