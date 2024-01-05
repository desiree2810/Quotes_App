import React from "react";
import errorPage from "./errorPage";
import Lottie from "lottie-react";

const PageNotFound = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        animationData={errorPage}
        style={{ width: "60%", height: "60%" }}
      />
    </div>
  );
};

export default PageNotFound;
