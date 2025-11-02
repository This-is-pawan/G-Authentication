import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button 
      onClick={() => loginWithRedirect()} 
      className=" w-full p-3 bg-gray-50 text-black rounded-full mt-5 hover:bg-gray-100 cursor-pointer border-2 flex justify-center items-center"
    >
      Log In with 
    </button>
  );
};

export default LoginButton;