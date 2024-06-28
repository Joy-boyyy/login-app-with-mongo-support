import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";

import Cookies from "js-cookie";

const Signin = () => {
  const [email, changeEmailFun] = useState();
  const [password, chanePassFun] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const changingPortFun = (axiosVar) => {
    Cookies.set("jwt_token", axiosVar.data.Token, { expires: 1 });
    navigate("/");
  };

  const btnSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const axiosVar = await axios.post("http://localhost:8000/signin", {
        email,
        password,
      });
      console.log(axiosVar);

      if (axiosVar.status === 200) {
        changingPortFun(axiosVar);
        changeEmailFun("");
        chanePassFun("");
      }
    } catch (err) {
      console.error("login: error while passing data", err.response);
      if (err.response && err.response.data) {
        // here err.response is representing to response from backend of response properties.
        
        setErrorMessage(
          err.response.data.invalidpass ||
            err.response.data.error ||
            "Login failed"
        );
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  const checkCookie = Cookies.get("jwt_token");

  if (checkCookie !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div className=" w-1/2 h-1/2 bg-white text-black p-6">
        <div className=" text-center text-2xl font-bold mb-2">
          <h1>Login</h1>
        </div>

        <form className=" flex flex-col" onSubmit={btnSubmit}>
          <input
            required
            className="pl-2 rounded-lg h-10 border border-black  outline-none mb-2"
            type="email"
            value={email}
            onChange={(e) => {
              changeEmailFun(e.target.value);
            }}
            placeholder="Your-email"
          />
          <input
            required
            className="pl-2 rounded-lg h-10 border border-black  outline-none mb-2"
            type="password"
            value={password}
            onChange={(e) => {
              chanePassFun(e.target.value);
            }}
            placeholder="Your-password"
          />

          <div className="text-end">
            <button
              type="submit"
              className="bg-[#4681f4] text-white border-none p-2 rounded-xl outline-none"
            >
              Login
            </button>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}

          <div className="mt-4 bg-black h-1"></div>

          <div className=" text-center mt-2">
            <p>
              Not a user &{" "}
              <Link to="/signup" className="decoration-0 text-blue-500">
                Sign-Up
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
