import React, { createContext, useState, useEffect } from "react";
import { saveToken, saveUser, getToken, getUser } from "../utils/Utils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    const storedToken = getToken();
    setUser(storedUser);
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const handleSaveToken = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const handleSaveUser = (newUser) => {
    saveUser(newUser);
    setUser(newUser);
  };

  const saveVerifiedEmail = (email) => {
    setVerifiedEmail(email);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleSaveToken,
        handleSaveUser,
        removeToken,
        token,
        isLoading,
        user,
        verifiedEmail,
        saveVerifiedEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
