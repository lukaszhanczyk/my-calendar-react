import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
