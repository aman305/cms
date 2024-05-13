import React, { ChangeEvent, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const singupResponse: any =
        await firebase?.signUpUserWithEmailAndPassword(email, password);
      console.log(singupResponse);
      if (singupResponse && firebase) {
        toast.success("Login successful !");
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage = error.message.slice(10) || "Sing Up Failed";
      toast.error(errorMessage);
    }
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div
      className="flex flex-col  h-screen w-screen items-center justify-center font-sans
    bg-gradient-to-r from-sky-300 to-indigo-300 text-slate-900"
    >
      <form
        onSubmit={handleSignup}
        className="w-full sm:w-96 flex flex-col px-2 py-4 shadow-xl  rounded-xl bg-white
        bg-gradient-to-r from-sky-200 to-indigo-200
        drop-shadow-lg
        bg-opacity-60        
        backdrop-filter backdrop-blur-lg
        "
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create new account</h1>
        </div>
        <div className="flex flex-col  px-4 py-2 ">
          <label className="py-1.5 font-semibold">Email</label>
          <input
            className="w-full bg-slate-200  rounded px-2 py-2
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
            className=" w-full bg-slate-200 rounded px-2 py-2  placeholder:text-slate-400 
            bg-gradient-to-r from-sky-100 to-indigo-100"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            type="password"
          />
          <span className="flex items-center gap-1">
            <p className="py-2">Already have an account?</p>{" "}
            <Link
              className="font-bold text-blue-600 hover:underline"
              to="/signin"
            >
              Log In
            </Link>
          </span>
        </div>
        <div className=" text-center py-2">
          <input
            type="submit"
            className="bg-slate-200 px-4 py-2 rounded-2xl hover:bg-blue-600 hover:text-white font-bold"
            value={"Sign Up"}
          />
        </div>
      </form>
    </div>
  );
};
export default Signup;
