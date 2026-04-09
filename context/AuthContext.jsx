import React, { createContext, useState, useEffect } from 'react';
import { auth, googleProvider, facebookProvider, instagramProvider } from '../firebase.config';
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Firebase Auth Real-time Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("[AUTH] State Changed:", firebaseUser ? firebaseUser.email : "No User");
      
      if (firebaseUser) {
        // 2. Cross-check with MySQL Backend
        try {
          const response = await fetch(`http://localhost:5000/api/auth/firebase-sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              uid: firebaseUser.uid, 
              email: firebaseUser.email, 
              name: firebaseUser.displayName 
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser({ ...firebaseUser, ...data.user, token: data.token });
            console.log("[AUTH] Backend Synced Successfully");
          } else {
            console.warn("[AUTH] New Social User detected, awaiting Role Selection");
            setUser({ ...firebaseUser, isNewUser: true });
          }
        } catch (err) {
          console.error("[AUTH] Backend Sync Failed. Internal API might be down.", err);
          setUser({ ...firebaseUser, syncError: true }); // Graceful fallback
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🛡️ High-Performance Social Wrappers with Popup Error Handling
  const socialSignIn = async (provider) => {
    try {
      console.log(`[AUTH] Triggering Popup for ${provider.providerId}...`);
      const result = await signInWithPopup(auth, provider);
      console.log("[AUTH] Social Auth Result:", result.user.email);
      return result;
    } catch (error) {
      if (error.code === 'auth/popup-blocked') {
        alert("Sign-in popup was blocked by your browser. Please allow popups for this site.");
      } else {
        console.error("[AUTH] Popup Error:", error.message);
        alert(`Authentication Error: ${error.message}`);
      }
      throw error;
    }
  };

  const signInWithGoogle = () => socialSignIn(googleProvider);
  const signInWithFacebook = () => socialSignIn(socialSignIn(facebookProvider)); 
  const signInWithInstagram = () => socialSignIn(instagramProvider);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err) {
      console.error("[AUTH] Login Failed:", err);
      return { success: false, error: "Server connection failed" };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      if (response.ok) return { success: true };
      return { success: false, error: data.error };
    } catch (err) {
      console.error("[AUTH] Register Failed:", err);
      return { success: false, error: "Server connection failed" };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) return { success: true, message: data.message };
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: "Server connection failed" };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      const data = await response.json();
      if (response.ok) return { success: true, message: data.message };
      return { success: false, error: data.error };
    } catch (err) {
      return { success: false, error: "Server connection failed" };
    }
  };

  const logout = () => {
    firebaseSignOut(auth);
    localStorage.removeItem('token');
    setUser(null);
    console.log("[AUTH] User Logged Out");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle, 
      signInWithFacebook, 
      signInWithInstagram, 
      login, 
      register, 
      forgotPassword, 
      resetPassword,
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
