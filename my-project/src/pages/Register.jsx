import { MdWifiPassword } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi";
import LoginButton from "./LoginButton";
// import {useAuth0} from '@auth0/auth0-react'
const Register = () => {
  // const {loginWithRedirect}=useAuth0();
  const { isAuth, setIsAuth ,handleUserExist} = useContext(AuthContext);
  const navigate = useNavigate();
  const [pass, setPass] = useState(true);
  const [formMode, setFormMode] = useState("register");
  const [name, setName] = useState("peter");
  const [email, setEmail] = useState("peter@gmail.com");
  const [password, setPassword] = useState("peter123#");
  const [loading, setLoading] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading("loading");

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/register",
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Registered successfully!");
        setIsAuth(!isAuth);
        setFormMode("login");
      
        handleUserExist()
      } else {
        toast.error(data.message || "Register failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading("loading");

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Login successful!");
        setIsAuth(!isAuth);
        navigate("/");
        handleUserExist()

      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[400px] mx-auto shadow-lg bg-white mt-16 p-5 rounded-lg">
      <form
        className="grid gap-3 relative"
        onSubmit={formMode === "register" ? handleRegister : handleLogin}
      >
        {formMode === "login" ? (
          <>
            <label>Email</label>
            <input
              type="email"
              className="bg-pink-50 rounded-xl p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type={pass ? "password" : "text"}
              className="bg-pink-50 rounded-xl p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <MdWifiPassword
              className="absolute top-[8.5rem] right-3 cursor-pointer hover:text-pink-400"
              onClick={() => setPass(!pass)}
              size={18}
            />

            <button
              type="submit"
              className="p-3 bg-gray-950 text-white rounded-full mt-5 hover:bg-gray-700 cursor-pointer border-2 flex justify-center items-center"
            >
              {loading === "loading" ? (
                <LuLoader className="animate-spin" />
              ) : (<>
                <span>Login</span>
                
                </>
              )}
            </button>
            <p className="text-center capitalize font-bold">OR</p>

            <p className="text-center m-3">
              Don’t have an account?
              <span
                className="text-blue-900 underline pl-2 cursor-pointer"
                onClick={() => setFormMode("register")}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <>
            <label>Name</label>
            <input
              type="text"
              className="bg-pink-50 rounded-xl p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              className="bg-pink-50 rounded-xl p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type={pass ? "password" : "text"}
              className="bg-pink-50 rounded-xl p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <MdWifiPassword
              className="absolute top-[14rem] right-3 cursor-pointer hover:text-pink-400"
              onClick={() => setPass(!pass)}
              size={18}
            />

            <button
              type="submit"
              className="p-3 bg-gray-950 text-white rounded-full mt-5 hover:bg-gray-700 cursor-pointer border-2 flex justify-center items-center"
            >
              {loading === "loading" ? (
                <LuLoader className="animate-spin" />
              ) : (
                <span>Register</span>
              )}
            </button>
  
            <p className="text-center m-3">
              Already have an account?
              <span
                className="text-blue-900 underline pl-2 cursor-pointer"
                onClick={() => setFormMode("login")

                }
              >
                Login
              </span>
            </p>
          </>
        )}
      </form>
    <div className="flex items-center justify-center relative">
<FcGoogle className="absolute top-10 left-16 "/>
<FaGithub className="absolute top-10 left-10" />
<FaFacebook className="text-blue-700 absolute top-10 left-3 "/>
      <LoginButton/>
      </div>

    </div>
  );
};

export default Register;
