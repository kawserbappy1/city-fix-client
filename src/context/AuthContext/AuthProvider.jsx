import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

  // SignInUser
  const SignInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut
  const logOut = () => {
    setLoader(true);
    return signOut(auth);
  };
  // Update profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const authData = {
    user,
    loader,
    signUpNewUser,
    signUpWithGoogle,
    SignInUser,
    logOut,
    updateUserProfile,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
