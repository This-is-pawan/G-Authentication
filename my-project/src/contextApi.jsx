// src/contextApi.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const ContextApi = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userExist, setExistUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUserExist = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/api/user",
        { withCredentials: true }
      );
      setExistUser(result?.data);
      setIsAuth(true);
      // console.log("User data:", result.data);
    } catch (err) {
      console.error("Error fetching user:", err.message);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserExist();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        handleUserExist,
        userExist,
        setExistUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextApi;