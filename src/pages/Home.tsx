import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
// import "../css/home.css";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };
  const context = useFirebase();
  return (
    <div
      className="flex justify-center items-center w-screen h-screen text-center
    bg-gradient-to-r from-sky-300 to-indigo-300"
    >
      <div
        className="sm:w-1/2 md:w-1/2 w-full flex flex-column gap-8 items-center justify-center shadow-lg p-6 rounded-xl 
      bg-gradient-to-r from-sky-200 to-indigo-200
      text-slate-900"
      >
        <img
          className="hidden md:block sm:nlock w-60 h-60"
          src="https://thelogocompany.net/wp-content/uploads/2022/03/dragon-arms-prod4.png"
          alt=""
        />
        <h1 className="text-4xl">Merchandise Command Center</h1>
        <p className="w-full ">
          Take control of your merchandise with our Product Management Suite.
          From adding new products to tracking stock levels, empower your team
          to drive sales and growth. With the Merchandise Command Center, you
          gain unparalleled control and insight into your product ecosystem,
          enabling you to stay agile, responsive, and ahead of the competition
          in today's dynamic marketplace."
        </p>
        <button
          onClick={handleClick}
          className="px-8 py-2 hover:bg-blue-600 hover:text-white font-semibold border rounded-full 
          bg-slate-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
