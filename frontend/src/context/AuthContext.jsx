import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState(false);

  const [user, setUser] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState({});
  const [templateList, setTemplateList] = useState([]);
  const [coverLetterList, setCoverLetterList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cover Letter List: " + coverLetterList);
  }, [coverLetterList]);

  const login = (userData, token) => {
    setStatus(true);
    setUser(userData);
    localStorage.setItem("token", token);
    navigate("/");
  };

  const logout = () => {
    setStatus(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        login,
        logout,
        isLoading,
        startLoading,
        stopLoading,
        selectedResume,
        setSelectedResume,
        templateList,
        setTemplateList,
        coverLetterList,
        setCoverLetterList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
