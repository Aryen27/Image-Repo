import { createContext, useContext , useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user',JSON.stringify(userData));
    setUser(userData);
    setIsAuth(true);
  }
  
  function logout() {
    sessionStorage.removeItem('token',);
    sessionStorage.removeItem('user');
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
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('Context must be used within provider!');
  return context;
}