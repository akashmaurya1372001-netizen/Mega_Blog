import React from "react";
import download from "../assets/download.png";

function Logo({ width = "100px" }) {
  return (
    <div className="w-20 rounded-full">
      <img src={download} alt="logo" className="rounded-full" />
    </div>
  );
}

export default Logo;