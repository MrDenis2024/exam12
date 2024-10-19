import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Photos from './containers/Photos/Photos';
import UserPhotos from './containers/UserPhotos/UserPhotos';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Photos />} />
        <Route path='/user/:id' element={<UserPhotos />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
