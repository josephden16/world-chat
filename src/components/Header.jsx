import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { signInWithGoogle, auth } from "../firebase";
import { AuthContext } from "./providers/AuthProvider";

export default function Header() {
  const user = useContext(AuthContext);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const toggleSignOutPopUp = () => setPopUpOpen(!popUpOpen);
  const closeSignOutPopUp = () => setPopUpOpen(false);

  return (
    <div className="sticky w-full top-0">
      <div className="bg-primary h-14 lg:h-16 px-2 text-white flex justify-between items-center">
        <h1 className="font-bold text-xl">World Chat</h1>
        {!user && (
          <button
            onClick={signInWithGoogle}
            className="border-white border-2 px-3 py-1 font-semibold rounded-md"
          >
            Sign in
          </button>
        )}
        {user && (
          <div className="flex">
            <img
              alt={user.displayName}
              src={user.photoURL}
              className="w-10 rounded-circle cursor-pointer"
              onClick={toggleSignOutPopUp}
            />
            <SignOutPopUp isOpen={popUpOpen} closePopUp={closeSignOutPopUp} />
          </div>
        )}
      </div>
    </div>
  );
}

const SignOutPopUp = ({ isOpen, closePopUp }) => {
  return (
    <div className={isOpen ? "block absolute bg-white top-20 right-2" : "hidden"}>
      <button
        className="bg-primary px-2 py-2 font-semibold rounded-md z-50"
        onClick={async () => {
          closePopUp();
          await signOut(auth);
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
