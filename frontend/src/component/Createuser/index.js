import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";

import Cookies from "js-cookie";

const Createuser = () => {
  const [name, changeNameFun] = useState();
  const [email, changeEmailFun] = useState();
  const [password, chanePassFun] = useState();
  
  // we used a state to handle error. 
  const [findmsg, findMsgFill] = useState("");

  const navigate = useNavigate();

  // here in below function we are saving jwt token in cookie for 1 day.
  // having set cookie we are navigation on home route

  const changingPortFun = (axiosVar) => {
    Cookies.set("jwt_token", axiosVar.data.Token, { expires: 1 });
    navigate("/");
  };

  const btnSubmit = async (e) => {
    e.preventDefault();
    findMsgFill("");

    try {
        // axios by default uses JSON.stringify() to convert into string
        // so as by default it uses JSON.parse() to convert into object

      const axiosVar = await axios.post("http://localhost:8000/signup", {
        name,
        email,
        password,
      });
      console.log(axiosVar);

      if (axiosVar.status === 200) {
        changingPortFun(axiosVar);
        changeNameFun("");
        changeEmailFun("");
        chanePassFun("");
        findMsgFill("");
      }
    } catch (err) {
      console.error("creating new user error", err.response);

      // ----here err.response {resposne} is re presenting to response from backend we pass
      // below used opetional channing to avoid any error
      // using optional chaining (?.) ensures that your code handles cases where any of these
      // properties might be null or undefined, preventing potential errors like
      // "Cannot read property 'msg' of undefined" in case any of these properties are missing.

      findMsgFill(
        err.response?.data?.msg || err.response?.data?.error || "Error occurred"
      );
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
          <h1>Sign-up</h1>
        </div>

        <form className=" flex flex-col" onSubmit={btnSubmit}>
          <input
            required
            className="pl-2 rounded-lg h-10 border border-black  outline-none mb-2"
            type="text"
            value={name}
            onChange={(e) => {
              changeNameFun(e.target.value);
            }}
            placeholder="Your-name"
          />
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
              Signup
            </button>
          </div>

          {/* here below we are printing data on the bases of if email is already present unless not */}

          {findmsg && (
            <div className="text-red-500 text-center mb-4">{findmsg}</div>
          )}

          <div className="mt-4 bg-black h-1"></div>

          <div className=" text-center mt-2">
            <p>
              Already a user &{" "}
              <Link to="/signin" className="decoration-0 text-blue-500">
                {" "}
                Login
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createuser;
