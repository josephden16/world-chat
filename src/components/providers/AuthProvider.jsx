import React, { createContext, useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserDocument } from "../../firebase";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        try {
          // creates a new user profile document if none exists
          const userRef = getUserDocument(userAuth.uid);
          const snapshot = await getDoc(userRef);
          setUser({ uid: snapshot.id, ...snapshot.data() });
        } catch {
          alert("Failed to sign in.");
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [props]);

  return (
    <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
