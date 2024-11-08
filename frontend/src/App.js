import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import { Login } from './Components/Login/Login';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Components/UserProfile/UserProfile';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';
import axios from 'axios';

// Import react-toastify components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  // Sample toast notification (You can call this in different components where necessary)
  const showToast = () => {
    toast.success("Welcome to the application!");
  };

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Account /> : <Register />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />
        <Route path="/newpost" element={isAuthenticated ? <NewPost /> : <Login />} />
        <Route path="/update/profile" element={isAuthenticated ? <UpdateProfile /> : <Login />} />
        <Route path="/update/password" element={isAuthenticated ? <UpdatePassword /> : <Login />} />
        <Route path="/forgot/password" element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast container to display notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
