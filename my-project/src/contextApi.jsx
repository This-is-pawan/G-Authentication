// // src/contextApi.jsx
// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// //  Detect system dark mode preference
// const getInitialDarkMode = () => {
//   const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   return prefersDarkMode;
// };

// const ContextApi = ({ children }) => {
//   //  Auth and user state
//   const [isAuth, setIsAuth] = useState(false);
//   const [userExist, setExistUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Theme management
//   const [isDarkTheme, setDarkTheme] = useState(getInitialDarkMode());

//   //  Search and history state
//   const [searchTheme, setSearchTheme] = useState("dog");
//   const [searchHistory, setSearchHistory] = useState(
//     JSON.parse(localStorage.getItem("searchHistory")) || []
//   );

//   //  Add new search term to history
//   const addToHistory = (term) => {
//     if (!term) return; // Skip empty searches
//     setSearchHistory((prev) => {
//       // Avoid duplicates, move recent search to top, limit to 10 items
//       const newHistory = [term, ...prev.filter((item) => item !== term)];
//       return newHistory.slice(0, 10);
//     });
//   };

//   // Save history to localStorage when it changes
//   useEffect(() => {
//     localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
//   }, [searchHistory]);

//   //  Automatically add to history whenever `searchTheme` changes
//   useEffect(() => {
//     if (searchTheme) addToHistory(searchTheme);
//   }, [searchTheme]);

//   //  Dark mode toggle
//   const toggleDarkTheme = () => setDarkTheme((prev) => !prev);

//   // Apply theme to <body> element
//   useEffect(() => {
//     document.body.classList.toggle("dark-theme", isDarkTheme);
//   }, [isDarkTheme]);

//   //  Verify user session from backend
//   const handleUserExist = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get("https://g-authentication.onrender.com/api/user", {
//         withCredentials: true,
//       });

//       if (res?.data) {
//         setExistUser(res.data);
//         setIsAuth(true);
//         localStorage.setItem("userExist", JSON.stringify(res.data));
//       } else {
//         throw new Error("No active session");
//       }
//     } catch (err) {
//       console.warn("Session expired or user not logged in:", err.message);
//       setIsAuth(false);
//       setExistUser(null);
//       localStorage.removeItem("userExist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Run once when app starts
//   useEffect(() => {
//     handleUserExist();
//   }, []);

//   //  Logout user
//   const logoutUser = async () => {
//     try {
//       await axios.post("https://g-authentication.onrender.com/api/logout", {}, { withCredentials: true });
//     } catch (err) {
//       console.error("Logout error:", err.message);
//     } finally {
//       setIsAuth(false);
//       setExistUser(null);
//       localStorage.removeItem("userExist");
//     }
//   };

//   //  Provide all values to context
//   return (
//     <AuthContext.Provider
//       value={{
//         // Auth
//         isAuth,
//         setIsAuth,
//         userExist,
//         setExistUser,
//         handleUserExist,
//         loading,

//         // Theme
//         isDarkTheme,
//         toggleDarkTheme,

//         // Search
//         searchTheme,
//         setSearchTheme,
//         searchHistory,
//         setSearchHistory,
//         addToHistory,

//         // Logout
//         logoutUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default ContextApi;
// #####################################
// src/contextApi.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// 🌙 Detect system dark mode preference
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkMode;
};

const ContextApi = ({ children }) => {
  // 🔐 Auth and user state
  const [isAuth, setIsAuth] = useState(false);
  const [userExist, setExistUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🎨 Theme management
  const [isDarkTheme, setDarkTheme] = useState(getInitialDarkMode());

  // 🔍 Search and history state
  const [searchTheme, setSearchTheme] = useState("dog");
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );

  // 🧠 Add search term to history
  const addToHistory = (term) => {
    if (!term) return;
    setSearchHistory((prev) => {
      const newHistory = [term, ...prev.filter((item) => item !== term)];
      return newHistory.slice(0, 10);
    });
  };

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (searchTheme) addToHistory(searchTheme);
  }, [searchTheme]);

  // 🌓 Toggle dark mode
  const toggleDarkTheme = () => setDarkTheme((prev) => !prev);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

 // ✅ Verify user session from backend on app load
const handleUserExist = async () => {
  try {
    setLoading(true);
    const res = await axios.get("https://g-authentication.onrender.com/api/user", {
      withCredentials: true,
    });

    if (res?.data?.success && res?.data?.user) {
      setExistUser(res.data.user);
      setIsAuth(true);
      localStorage.setItem("userExist", JSON.stringify(res.data.user));
    } else {
      throw new Error("No active session");
    }
  } catch (err) {
    console.warn("Session expired or user not logged in:", err.message);

    if (err.response?.status === 401) {
      setIsAuth(false);
      setExistUser(null);
      localStorage.removeItem("userExist");
    }
  } finally {
    setLoading(false);
  }
};


  // 🧩 Run once when app starts
  useEffect(() => {
    handleUserExist();
  }, []);

  // ✅ FIXED: Add this loginUser() function to update context instantly after login
  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://g-authentication.onrender.com/api/login",
        { email, password },
        { withCredentials: true }
      );

      // 🔑 Update auth state immediately after successful login
      setExistUser(data.user || data);
      setIsAuth(true);
      localStorage.setItem("userExist", JSON.stringify(data.user || data));

      return true; // success
    } catch (err) {
      console.error("Login failed:", err.message);
      return false; // failed
    }
  };

  // 🚪 Logout user
  const logoutUser = async () => {
    try {
      await axios.post("https://g-authentication.onrender.com/api/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setIsAuth(false);
      setExistUser(null);
      localStorage.removeItem("userExist");
    }
  };

  // 📦 Provide all context values
  return (
    <AuthContext.Provider
      value={{
        // Auth
        isAuth,
        setIsAuth,
        userExist,
        setExistUser,
        handleUserExist,
        loginUser, // ✅ added
        logoutUser,
        loading,

        // Theme
        isDarkTheme,
        toggleDarkTheme,

        // Search
        searchTheme,
        setSearchTheme,
        searchHistory,
        setSearchHistory,
        addToHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextApi;

