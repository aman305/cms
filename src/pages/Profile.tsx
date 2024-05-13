import React from "react";
import { useFirebase } from "../context/Firebase";
import Navbar from "../components/Navbar";

type Props = {};

const Profile = (props: Props) => {
  const firebase = useFirebase();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-indigo-300">
        <div className="flex flex-col items-center  h-[50%] gap-3">
          <div className="w-20">
            <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />
          </div>
          <div className="text-white text-2xl">
            Email:{" "}
            {firebase?.currentUser?.email ? firebase?.currentUser.email : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
