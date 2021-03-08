import React, {useState} from "react";
// import CustomSelect from "./Components/CustomSelect.js";
// import ToggleSwitch from "./Components/ToggleSwitch.js";
// import Button from "./Components/Button.js";
// import Modal from "./Components/Modal.js";
// import TextInput from "./Components/TextInput"
import {Field, reduxForm} from 'redux-form'
import { formValues } from 'redux-form' // ES6
// import { useInput } from './hooks/input-hook';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function QuoteOneView(props) {

    const counter = useSelector(state => state);

    const dispatch = useDispatch();

    const total = 0.00

    console.log(counter)


        return (
            <p>test</p>
                   );

}

// QuoteOne = reduxForm({
//     // a unique name for the form
//     form: 'batting'
// })(QuoteOne)


export default QuoteOneView;
