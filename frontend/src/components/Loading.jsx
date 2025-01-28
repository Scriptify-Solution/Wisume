import React from "react";
import "../assets/css/loading.css";
import { useAuth } from "../context/AuthContext";

const Loading = () => {
  const { isLoading } = useAuth();
  if (!isLoading) return <div></div>;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
