import { MdWifiPassword } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi";
import LoginButton from "./LoginButton";

const Register = () => {
  const { setIsAuth, handleUserExist, isDarkTheme } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pass, setPass] = useState(true);
  const [formMode, setFormMode] = useState("register");
  const [name, setName] = useState("peter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Dynamic input style
  const inputClass = `${isDarkTheme ? "bg-gray-900 text-white" : "bg-pink-200 text-black"} 
                      rounded-xl p-2 border-none outline-none placeholder-gray-400`;

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://g-authentication.onrender.com/api/register",
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Registered successfully!");
        await handleUserExist();
        setIsAuth(true);
        setFormMode("login");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://g-authentication.onrender.com/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Login successful!");
        await handleUserExist();
        setIsAuth(true);
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-[90%] sm:w-[80%] md:w-[400px] mx-auto shadow-lg mt-16 p-5 rounded-lg ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <form
        className="grid gap-3 relative"
        onSubmit={formMode === "register" ? handleRegister : handleLogin}
      >
        {formMode === "login" ? (
          <>
            <label>Email</label>
            <input
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type={pass ? "password" : "text"}
              className={inputClass}
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
              disabled={loading}
              className="p-3 bg-gray-950 text-white rounded-full mt-5 hover:bg-gray-700 border-2 flex justify-center items-center"
            >
              {loading ? <LuLoader className="animate-spin" /> : <span>Login</span>}
            </button>

            <p className="text-center capitalize font-bold mt-2">OR</p>

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
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type={pass ? "password" : "text"}
              className={inputClass}
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
              disabled={loading}
              className="p-3 bg-gray-950 text-white rounded-full mt-5 hover:bg-gray-700 border-2 flex justify-center items-center"
            >
              {loading ? <LuLoader className="animate-spin" /> : <span>Register</span>}
            </button>

            <p className="text-center m-3">
              Already have an account?
              <span
                className="text-blue-900 underline pl-2 cursor-pointer"
                onClick={() => setFormMode("login")}
              >
                Login
              </span>
            </p>
          </>
        )}
      </form>

      {/* Social login section */}
      <div className="flex items-center justify-center relative mt-5">
        <FcGoogle className="absolute top-10 left-16" />
        <FaGithub className="absolute top-10 left-10" />
        <FaFacebook className="text-blue-700 absolute top-10 left-3" />
        <LoginButton />
      </div>
    </div>
  );
};

export default Register;
