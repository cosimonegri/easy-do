import React, { useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "utils/firebase";
import { LoadingScreen } from "layouts/LoadingScreen";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRetrievingUser, setIsRetrievingUser] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const updateEmail = (email) => {
    return; //
  };
  const updatePassword = (password) => {
    return; //
  };
  const setAuthPersistence = (persistent) => {
    const type = persistent
      ? browserLocalPersistence
      : browserSessionPersistence;
    return setPersistence(auth, type);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user); // null if no user is logged in
      setIsRetrievingUser(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    isRetrievingUser,
    signup,
    login,
    logout,
    emailVerification,
    resetPassword,
    loginWithGoogle,
    setAuthPersistence,
  };

  return (
    <AuthContext.Provider value={value}>
      {isRetrievingUser ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
