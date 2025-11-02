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
  const { userExist } = useContext(AuthContext);
  const { isAuthenticated, isLoading } = useAuth0();

  const userAuthenticated = isAuthenticated || userExist;

  if (isLoading) return <p>Loading...</p>;

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

        {/* Protected route */}
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
