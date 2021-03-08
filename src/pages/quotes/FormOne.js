import React, {useState} from "react";
import CustomSelect from "../../component/quotes/CustomSelect.js";
import ToggleSwitch from "../../component/quotes/ToggleSwitch.js";
import Button from "../../component/quotes/Button.js";
import Modal from "../../component/quotes/Modal.js";
import QuoteOne from "./QuoteOne.js";

function FormOne() {
    const data = [
        {
            id: "1",
            name: "Batting Template",
            details: "We will supply and install",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "2",
            name: "Cellulose Quote Template",
            details: "",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "3",
            name: "Drill & Fill Template",
            details: "We will supply and install Thermocomfort vermin resistant blown cellulose insulation to the wall cavities. CCMC # 08774-L. This process includes drilling 2-3, 2 inch holes per cavity and filling with cellulose. Reitzel Insulation is responsible to plug and patch the holes with the first layer of sheetrock 90. Reitzel Insulation cannot be held liable for poor wall make-up. The customer is responsible to refinish the wall as they see fixed.",
            customer_notes: "All tools, debris and personal belongings need to be moved at least 6 feet away from the application area to allow our crew to complete their work. All pictures and wall hangings need to be removed prior to the arrival of our crew.",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "4",
            name: "Fireproofing Template",
            details: "",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "5",
            name: "Form Template",
            details: "",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "6",
            name: "Insulation Removal",
            details: "",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "7",
            name: "Fireproofing Template",
            details: "",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        },
        {
            id: "8",
            name: "Pour Foam Template",
            details: "",
            customer_notes: "",
            account: "1941844",
            firm: "245166V"
        }
    ];

    const [quotename, setQuotename] = useState("");
    const [quoteData, setQuoteData] = useState("");


    function onSelectChange(e) {


        if (e == null || e == "" || e == undefined) {
            setQuotename(null)
        } else {
            console.log(e)
            setQuoteData(e);
            setQuotename(e.name);
        }
    }



    return (
        <div className="Form">
            <h2>Form - Quote Selection</h2>
            <form>
                <div>
                    <label> Select Quote Type</label>
                    <CustomSelect data={data} onSelectChange={onSelectChange}/>
                </div>

            </form>
            {quotename ? <QuoteOne quotename={quotename} quoteData={quoteData} /> : null}
        </div>
    );
}


export default FormOne;
