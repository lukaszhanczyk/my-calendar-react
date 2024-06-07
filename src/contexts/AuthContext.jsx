import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', "true");
    setIsLoggedIn(true);
    setUser(user);
  };
  const logout = () => {
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('isLoggedIn', "false");
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
