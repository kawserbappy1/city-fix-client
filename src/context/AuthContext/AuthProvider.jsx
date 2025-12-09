import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init.js";
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);

  // Sign up new users
  const signUpNewUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Sign Up with Google
  const signUpWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };
  const authData = {
    user,
    loader,
    signUpNewUser,
    signUpWithGoogle,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
