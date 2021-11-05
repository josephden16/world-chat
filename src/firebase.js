// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZi9_plOK7xSxgDHhjsxYgDBNCwpDOBIQ",
  authDomain: "world-chat-d9e93.firebaseapp.com",
  projectId: "world-chat-d9e93",
  storageBucket: "world-chat-d9e93.appspot.com",
  messagingSenderId: "1081866467484",
  appId: "1:1081866467484:web:6c2c551749c65e4bd31559",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// auth
const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleAuthProvider)
    .then(async (userCredentials) => {
      // create a new user document if it doesn't exist
      const { user } = userCredentials;
      await createUserProfileDocument(user);
    })
    .catch(() => {
      // console.log(`error-message: ${error.message}, error-code: ${error.code}`);
    });
};

export const createUserProfileDocument = async (
  authenticatedUser,
  additionalData
) => {
  if (!authenticatedUser) return;

  const user = authenticatedUser;

  const userRef = doc(firestore, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email, photoURL } = user;
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt: new Date(),
        ...additionalData,
      });
      console.log("user created successfully");
    } catch (error) {
      console.log(`error-message: ${error.message}, error-code: ${error.code}`);
    }
  }
};

export const getUserDocument = (uid) => {
  if (!uid) return null;

  try {
    return doc(firestore, "users", uid);
  } catch (error) {
    // console.log("Error fetching user document", error.message);
  }
};
