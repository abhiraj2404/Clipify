import React from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { Avatar } from "@nextui-org/react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("user exists");
          setCurrentUser({
            user_name: userData.user_name || "Clipify_User",
            full_name: userData.full_name || user.displayName,
            email: userData.email || "",
            photoURL: userData.photoURL || "",
          });
        } else {
          // Create a new user document if it doesn't exist
          const newUserData = {
            user_name: "Clipify_User",
            full_name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          console.log("user registered as new user");
          await setDoc(userRef, newUserData);
          setCurrentUser(newUserData);
        }

        setIsLoggedIn(true);
        console.log(user.displayName);
      } else {
        console.log("notsignedin");
      }
    });
  }, []);

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
                <h2 className="font-bold ">USERNAME : </h2>
                <p className="border-b-1 border-gray-400">
                  {currentUser.user_name}
                </p>
              </div>
              <div>
                <h2 className="font-bold ">NAME : </h2>
                <p className="border-b-1 border-gray-400">
                  {currentUser.full_name}
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
