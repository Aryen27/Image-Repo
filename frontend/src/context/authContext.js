import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /*
  1. Initialize state of user and auth
  2. useEffect to check if user has logged in
  3. Function to log user in and add cred to session storage
  4. Function to log user out and clear cred from local storage
  */
  
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken && sessionUser) {
      setUser(sessionUser);
      setIsAuth(true);
    }
  }, []);

  function login(userData, token) {
    sessionStorage.setItem(token);
    sessionStorage.setItem(userData);
    setUser(userData);
    setIsAuth(true);
  }
  
  function logout(userData, token) {
    sessionStorage.removeItem(token);
    sessionStorage.removeItem(userData);
    setUser(null);
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = createContext(AuthContext);
  if (!context)
    throw new Error('Context must be used within provider!');
  return context;
}