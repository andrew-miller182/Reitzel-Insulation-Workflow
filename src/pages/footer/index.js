import { Center } from "devextreme-react/map";
import React from "react";
import "./index.css";
import visa from "../../assets/visa.png";
import master from "../../assets/master.png";
import express from "../../assets/express.png";
export default function Footerforquote() {
  return (
    <div className="footerforqueto">
      <div className="beware">
        PLEASE BE AWARE THAT POLYURETHANE SPRAY FOAM INSULATION REQUIRES A
        THERMAL BARRIER I.E. DRYWALL, OR FIREPROOFING. ¼ INCH TOLERENCE DURING
        APPLICATION IS REQUIRED.{" "}
      </div>
      <div className="payment">
        PAYMENT UPON COMPLETION OF WORK IS REQUIRED IN FULL BY CASH, CHEQUE,
        VISA, MASTERCARD, OR AMERICAN EXPRESS. REITZEL INSULATION DOES NOT GIVE
        TERMS UNLESS PRE-AUTHORIZED PRIOR TO PROJECT START DATE.
      </div>
      <div className="cardlogos">
        <img src={visa}></img>
        <img src={express}></img>
        <img src={master}></img>
      </div>
    </div>
  );
}
