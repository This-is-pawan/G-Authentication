import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App = () => {
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
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </div>
  );
};

export default App;
