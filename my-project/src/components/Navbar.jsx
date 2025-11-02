import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../contextApi.jsx';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/react.svg';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../pages/LogoutButton.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, userExist, setExistUser } = useContext(AuthContext);
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://localhost:4000/api/logout',
        {},
        { withCredentials: true }
      );

      toast.success(result?.data?.message || 'Logout successfully');
      setIsAuth(false);
      setExistUser(null);
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Get initial for non-Auth0 user
  const userInitial =
    typeof userExist?.data?.name === 'string'
      ? userExist.data.name.charAt(0).toUpperCase()
      : null;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-pink-200 p-3 flex items-center justify-around">
      <h1 className="text-xl font-mono font-bold">Go-Auth</h1>

     
      {isAuthenticated ? (
        // Auth0 User
        <div className="flex items-center gap-2">
          <img
            src={user?.picture}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{user?.name}</span>
        </div>
      ) : userExist ? (
        // Local Auth User
        <div className="flex items-center gap-2">
          <p className="w-10 h-10 rounded-full bg-white text-black capitalize font-bold text-center leading-[2.5rem]">
            {userInitial}
          </p>
        <p className="w-8 h-8 flex items-center justify-center rounded-full border border-white bg-gray-200 text-xl shadow-md">
          🙎🏻‍♂️
        </p>
        </div>
      ) : (
        // Guest User
        <div className="flex items-center gap-2">
          <p className="w-10 h-10 rounded-full bg-gray-300 text-black text-center leading-[2.5rem] font-bold">
            🤖
          </p>
        </div>
      )}

      
      <div className="bg-white text-black rounded p-2 text-sm">
        <ul>
          {!isAuth && !isAuthenticated ? (
            <li>
              <Link
                to="/Register"
                className="font-serif capitalize tracking-wide"
              >
                signup/login
              </Link>
            </li>
          ) : (
            <li>
              {isAuthenticated ? (
                <LogoutButton />
              ) : (
                <button
                  className="font-serif capitalize tracking-wide"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
