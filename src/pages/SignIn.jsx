import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const signInResponse = await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log("error in signin", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <button
        onClick={signIn}
        className="bg-blue-600 px-4 py-2 rounded-lg w-fit text-white text-2xl "
      >
        Sign in with google
      </button>
    </div>
  );
}

export default SignIn;
