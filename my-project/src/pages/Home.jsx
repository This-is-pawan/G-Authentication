import React, { useContext } from "react";
import { AuthContext } from "../contextApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { userExist } = useContext(AuthContext);
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  if (isLoading)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;

  const userName = user?.name || userExist?.data?.name || "User";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
        👋🏽 Hi, <span className="text-pink-300 mt-2">{userName}</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md">
        Welcome to our service! We’re glad to have you here.
      </p>

      <Link
        to="/dashboard"
        className="mt-10 bg-white text-purple-500 capitalize py-3 px-10 rounded-full transition-all duration-300 hover:bg-purple-100"
      >
        Go to Dashboard ➜
      </Link>
    </div>
  );
};

export default Home;
