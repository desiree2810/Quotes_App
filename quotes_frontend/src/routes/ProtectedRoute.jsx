import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    if (!token && !userId) {
      navigate("/quotes");
    }
  });
  return (
    <>
      <Component />
    </>
  );
}

export default ProtectedRoute;
