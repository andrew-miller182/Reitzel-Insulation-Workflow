import React from "react";
import logo from "../../assets/logo.png";
import "./index.css";
export default function HeadForQuote() {
  return (
    <div className="headerforquoto">
      <img className="companylogo" src={logo}></img>
      <div className="companyinfo">
        <span>134 Northfield Drive East</span>
        <span>Waterloo, Ontario</span>
        <span>N2J 4G8</span>
        <span>519 886 6100</span>
        <span>www.reitzel.ca</span>
        <span>1-800-265-8869</span>
      </div>
    </div>
  );
}
