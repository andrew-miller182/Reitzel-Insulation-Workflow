import React, {useState, useEffect} from "react";
import CustomSelect from "../../component/quotes/CustomSelect.js";
import ToggleSwitch from "../../component/quotes/ToggleSwitch.js";
import Button from "../../component/quotes/Button.js";
import Modal from "../../component/quotes/Modal.js";
import QuoteOne from "./QuoteOne.js";
import axios from "axios";
import qData from './quoteData.js';


const data = qData.quote_data;

function FormOne(props) {
    const [quoteDataId, setQuoteDataId] = useState(props.quoteDataId);
    // const [quoteData, setQuoteData] = useState(
    //     [...data].find((d) => d.id == quoteDataId)
    // );

    function onSelectChange(e) {
        if (!(e == null || e == "" || e == undefined)) {
            props.onSetQuoteDataChange(data.find((d) => d.id == e))
        }else{
            props.onSetQuoteDataChange({})
        }
    }

    return (
        <div className="Form">
            <h2>Quote Selection</h2>
            <form>
                <div>
                    <label> Select Quote Type</label>
                    <CustomSelect data={data} quoteDataId={quoteDataId}  onSelectChange={onSelectChange}/>
                </div>
            </form>
            {/* { Object.keys(quoteData).length > 0 ? <QuoteOne key={quoteData} quoteData={quoteData} />: null } */}
        </div>
    );
}


export default FormOne;
