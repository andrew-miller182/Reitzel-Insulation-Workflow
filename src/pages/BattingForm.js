import React, {useState} from "react";
import CustomSelect from "./Components/CustomSelect.js";
import ToggleSwitch from "./Components/ToggleSwitch.js";
import Button from "./Components/Button.js";
import Modal from "./Components/Modal.js";
import TextInput from "./Components/TextInput";
import "./App.css";

function BattingForm(props) {

    return (
        <div className="Quote">
            <h2> {props.quotename}</h2>
            <form name="batting">
                <p>
                    Attention:
                    <TextInput type="text" name="first_name" placeholder="First Name"/>
                    <TextInput type="text" name="last_name" placeholder="Last Name"/>
                    <br/>
                    Address:
                    <TextInput type="text" name="billing_address" placeholder="Billing Address"/>
                    <br/>
                    City:
                    <TextInput type="text" name="city" placeholder="contractor city"/>
                    <br/>
                    Postal Code:
                    <TextInput type="text" name="post_code" placeholder="contractor postal code"/>
                    <br/>
                    Phone:
                    <TextInput type="text" name="phone_number" placeholder="contractor phone number"/>
                    <br/>
                    Email:
                    <TextInput type="text" name="email" placeholder="email" placeholder="contractor email"/>
                    <br/>


                    <table>
                        <thead>
                        <tr>
                            <td>Product Name</td>
                            <td>Option</td>
                            <td>Subtotal ($)</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><TextInput type="text" name="product_name[]" placeholder="Name"/></td>
                            <td><TextInput type="text" name="option[]" placeholder="option"/></td>
                            <td><TextInput type="text" name="price[]" placeholder="0.00" type="currency"/></td>
                        </tr>
                        <tr>
                            <td>adad</td>
                            <td>adad</td>
                            <td>192.22$</td>
                        </tr>
                        <tr>
                            <td>adad</td>
                            <td>adad</td>
                            <td>192.22$</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Total: ---------------------------------------------</td>
                            <td>400.00$</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3">
                                <Button size="2" varient="primary">Add+</Button>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    Notes to customer:
                    <TextInput type="text" name="customer_notes" placeholder="Notes to Customer"/>
                    <br/>

                    Notes to installers:

                    <TextInput type="text" name="installer_notes"  placeholder="Notes to Customer"/>
                    <br/>
                    Estimator:
                    <TextInput type="text" name="salesman" placeholder="salesman Name" />
                    <br/>
                    WSIB#
                    <TextInput type="text" name="wsib" placeholder="wsib" />
                    <br/>
                    Account <TextInput type="text" name="account" placeholder="Account No" />
                    <br/>
                    Firm # <TextInput type="text" name="firm" placeholder="Firm" />
                    <br/>
                    <Button size="2" varient="primary" type="submit">Submit</Button>
                </p>
            </form>
        </div>
    );
}


export default BattingForm;
