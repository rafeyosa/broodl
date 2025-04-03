"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const { children } = props;
  const [currentUser, setCurrrentUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    setCurrrentUser(null);
    setGlobalData(null);
    return signOut(auth);
  }

  const value = {
    currentUser,
    globalData,
    setGlobalData,
    isLoading,
    signUp,
    login,
    logout,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setIsLoading(true);

        console.log("Current User", user);
        setCurrrentUser(user);
  
        if (!user) {
          console.log("No active user");
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};
        if (docSnap.exists()) {
          firebaseData = docSnap.data();
          console.log("Found user data", firebaseData);
        }
        setGlobalData(firebaseData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
