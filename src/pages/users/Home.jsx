// const Home = () =>{
//     return (
//         <>
//             <h1>WELCOME TO LUXORA STORE</h1>
//         </>
//     )
// }

// export default  Home;



import React from "react";
import { useNavigate } from "react-router-dom";
import { clearSession } from "../../helper/session";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    clearSession();
      window.location.reload();
    navigate("/");
  };

  return (
    <div>
      <h1>Home Page (User)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
