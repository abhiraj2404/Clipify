import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Avatar } from "@nextui-org/react";

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log(user.displayName);
        // ...
      } else {
        console.log("notsignedin");
      }
    });
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col justify-center items-center h-[85vh] text-lg">
          <div className="shadow-2xl px-16 py-20 rounded-lg">
            <div className="flex flex-col justify-center gap-6">
              <Avatar
                src={currentUser.photoURL}
                className="w-20 h-20 text-large mx-auto"
              />
              <div>
                <h2 className="font-bold ">NAME : </h2>
                <p className="border-b-1 border-gray-400">
                  {currentUser.displayName}
                </p>
              </div>
              <div>
                <h2 className="font-bold ">EMAIL</h2>
                <p className="border-b-1 border-gray-400">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[85vh]">
          Login to see your profile
        </div>
      )}
    </div>
  );
}

export default UserProfile;
