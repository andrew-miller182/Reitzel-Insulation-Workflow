import React, { useState } from "react";
import CustomSelect from "./Components/CustomSelect.js";
import ToggleSwitch from "./Components/ToggleSwitch.js";
import Button from "./Components/Button.js";
import Modal from "./Components/Modal.js";
import QuoteOne from "./QuoteOne.js";

function FormOne() {
    const data = [
        {
          id: "1",
          name: "Batting Template"
        },
        {
          id: "2",
          name: "Cellulose Quote Template"
        },
        {
          id: "3",
          name: "Drill & Fill Template"
        },
        {
          id: "4",
          name: "Fireproofing Template"
        },
        {
          id: "5",
          name: "Foam Template"
        },
        {
          id: "6",
          name: "Insulation Removal"
        },
        {
          id: "7",
          name: "Fireproofing Template"
        },
        {
          id: "8",
          name: "Pour Foam Template"
        }
      ];

      const[quotename,setQuotename] = useState(""); 
    
      function onSelectChange(e) {
        if(e == null || e == "" || e == undefined){
            setQuotename(null)
        }else{
            console.log(e);
            setQuotename(e.name);
        }
      }
    
      return (
        <div className="Form">
            <h2>Form - Quote Selection</h2>
          <form>
            <div>
                <label> Select Quote Type</label>
              <CustomSelect data={data} onSelectChange={onSelectChange} />
            </div>
            <Button variant="primary" size={"lg"}> get { quotename } </Button>
          </form>
          { quotename ? <QuoteOne quotename={quotename} /> : null }
        </div>
      );
  }

  

export default FormOne;