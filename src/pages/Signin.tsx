import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast";

const Signin: React.FC = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogin(true);
    try {
      if (firebase) {
        await firebase?.signinUserWithEmailAndPassword(email, password);
        toast.success("Login Successful");
        navigate("/products");
      } else {
        setLogin(false);
        toast.error("Firebase not initialize properly");
      }
    } catch (error: any) {
      const errorMessage = error.message.slice(10) || "Login Failed";
      toast.error(errorMessage);
      setLogin(false);
    } finally {
      setLogin(false);
    }
  };

  return (
    <div
      className="flex flex-col  h-screen w-screen items-center justify-center font-sans
    bg-gradient-to-r from-sky-300 to-indigo-300
     text-slate-900"
    >
      <form
        onSubmit={handleSignIn}
        className="w-full sm:w-96  flex flex-col px-2 py-4 shadow-xl  rounded-xl bg-white
        bg-gradient-to-r from-sky-200 to-indigo-200
        drop-shadow-lg
        opacity-90"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
        </div>
        <div className="flex flex-col  px-4 py-2 ">
          <label className="py-1.5 font-semibold">Email</label>
          <input
            className=" w-full bg-slate-200  rounded px-2 py-2
            bg-gradient-to-r from-sky-100 to-indigo-100"
            placeholder="Enter your email"
            type="email"
            onChange={handleEmailChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex flex-col  px-4 py-2">
          <label className="py-1.5 font-semibold">Password</label>
          <input
            className="w-full bg-slate-200 rounded px-2 py-2  placeholder:text-slate-400 
            bg-gradient-to-r from-sky-100 to-indigo-100"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            type="password"
          />
        </div>
        <div className=" text-center py-2">
          <input
            type="submit"
            className="bg-slate-200 my-2 px-4 py-2 rounded-2xl hover:bg-blue-600 hover:text-white font-bold"
            value={login ? "Loggin In..." : "Log In"}
          />
        </div>
      </form>
    </div>
  );
};

export default Signin;
