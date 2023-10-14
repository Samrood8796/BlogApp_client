import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login';
import Register from './pages/Rgister/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import useOnline from './utils/useOnline';
import { useEffect } from 'react';
import ForgottPassword from './pages/ForgottPassword/ForgottPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  const userDetails = useSelector((state) => state.user)

  const isOnline = useOnline();
  if (!isOnline)
    return (
      <>
        <div
        >
          You are offline. Please check your internet connection and try again.
        </div>
      </>
    );

  return (
    <div className="App border-box">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={userDetails ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:id'element={userDetails ? <Profile /> : <Navigate to={"/login"} />}  />
          <Route path='/forgottPassword' element={<ForgottPassword />}/>
          <Route path='/success' element={<div className='text-3xl font-bold p-48 text-green-300'>check your email or spam page </div>} ></Route>
          <Route path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;