import React, { useState } from "react";
import CustomSelect from "./Components/CustomSelect.js";
import ToggleSwitch from "./Components/ToggleSwitch.js";
import Button from "./Components/Button.js";
import Modal from "./Components/Modal.js";

function QuoteOne(props) {
      const[quotename] = useState(props.quotename); 
      
      return (
        <div className="Quote">
            <h2> { quotename }</h2>
          <form>
            <p>
            Attention: (First Name, Last name)<br/>
            Address: (“Billing Address”)<br/>
            City: (“customer/contractor city”)<br/>
            Postal Code: (“customer/contractor postal code”)<br/>
            Phone: (“customer/contractor phone number”)<br/>
            Email: (“customer/contractor email”) (Option for “Job Site Address” if different than above, contractor information should be above<br/>
            anytime there is a contractor)<br/>
            We will supply and install “product name”<br/>
            -Option for R-value and manual text line with no character limit..<br/>
            Subtotal $ “.00”+Tax<br/>
            -Option for R-value and manual text line with no character limit..<br/>
            Subtotal $ “.00”+Tax<br/>
            Notes to customer: (Manual text line with option for multiple lines)<br/>
            Notes to installers: (Editable text line with option for multiple lines)<br/>
            (Option for “Grand Total $ .00+Tax”-can be automatically calculated but needs option to edit)<br/>
            Please feel free to call our office if you have any questions or concerns regarding this quotation.<br/>
            Estimator: “salesman”<br/>
            Regards, Reitzel Insulation<br/>
            WSIB# Account #1941844 / Firm # 245166V<br/>
            </p>
          </form>
        </div>
      );
  }

  

export default QuoteOne;