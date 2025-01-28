import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoadingPage = () => {
  const { login } = useAuth();

  const handleGoogleLinkdin = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        login(token, token);
      }
    } catch (e) {}
  };

  useEffect(() => {
    handleGoogleLinkdin();
  }, []);

  return <div>LoadingPage</div>;
};

export default LoadingPage;
