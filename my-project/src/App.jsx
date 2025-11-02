import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./contextApi";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { userExist, loading } = useContext(AuthContext);
  const { isAuthenticated, isLoading } = useAuth0();

  // ✅ Combine both local (context) and Auth0 states
  const userAuthenticated = isAuthenticated || userExist;

  // ⏳ Wait until both systems finish loading
  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        toastClassName="custom-toast"
        style={{
          width: "100%",
          maxWidth: "350px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            userAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
