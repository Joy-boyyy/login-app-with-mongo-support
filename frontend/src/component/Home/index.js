import Cookies from "js-cookie";
import { Navigate,useNavigate } from "react-router-dom";

const Home = () => {
  const gotCookie = Cookies.get("jwt_token");
  const navigate=useNavigate();

  if (gotCookie === undefined) {
    return <Navigate to="/signup" />;
  }


  const logoutBtn=()=>{
    Cookies.remove("jwt_token")
    return navigate("/signup");
  } 

  return (
    <div className="w-screen h-screen flex justify-center items-center text-2xl font-bold">
      <h1>I am Home</h1>
      <button type="button" onClick={logoutBtn} className="ml-5 p-3 rounded-md border border-black">Logout</button>
    </div>
  );
};

export default Home;






