import React, {useState} from "react";
import CustomSelect from "./Components/CustomSelect.js";
import ToggleSwitch from "./Components/ToggleSwitch.js";
import Button from "./Components/Button.js";
import Modal from "./Components/Modal.js";
import TextInput from "./Components/TextInput"
import {Field, reduxForm} from 'redux-form'
import {formValues} from 'redux-form' // ES6
import {useInput} from './hooks/input-hook';
import QuoteOneView from "./Components/QuoteOneView";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

function QuoteOne(props) {

    const {value, bind, reset} = useInput('');
    const data = useSelector(state => state.quoteOneReducer.quote_one);

    const dispatch = useDispatch();

    const {value: firstName, bind: bindFirstName, reset: resetFirstName} = useInput('');
    const {value: lastName, bind: bindLastName, reset: resetLastName} = useInput('');
    const {value: billingAddress, bind: bindBillingAddress, reset: resetBillingAddress} = useInput('');
    const {value: city, bind: bindCity, reset: resetCity} = useInput('');
    const {value: postCode, bind: bindPostCode, reset: resetPostCode} = useInput('');
    const {value: phoneNumber, bind: bindPhoneNumber, reset: resetPhoneNumber} = useInput('');
    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const {value: customerNotes, bind: bindCustomerNotes, reset: resetCustomerNotes} = useInput('');
    const {value: installerNotes, bind: bindInstallerNotes, reset: resetInstallerNotes} = useInput('');
    const {value: salesman, bind: bindSalesman, reset: resetSalesman} = useInput('');
    const {value: wsib, bind: bindWsib, reset: resetWsib} = useInput('');
    const {value: account, bind: bindAccount, reset: resetAccount} = useInput('');
    const {value: firm, bind: bindFirm, reset: resetFirm} = useInput('');

    const [productCounter, setProductCounter] = useState(0)
    const [products, setProducts] = useState([{
        name: null,
        option: null,
        price: 0.00

    }])

    const [formSubmit, setFormSubmit] = useState(false)


    const handleSubmit = (evt) => {

        // alert(`Submitting Name ${firstName}`);

        var payload = {
            first_name: firstName,
            last_name: lastName,
            billing_address: billingAddress,
            city: city,
            post_code: postCode,
            phone_number: phoneNumber,
            email: email,
            customer_notes: customerNotes,
            installer_notes: installerNotes,
            salesman: salesman,
            wsib: wsib,
            account: account,
            firm: firm,
            products: products
        }

        dispatch({
            type: "quote_one",
            payload: payload
        })

        setFormSubmit(true)
        reset();
        evt.preventDefault();
    }

    const [total, setTotal] = useState(0)

    const handleSubmitEvent = (values) => {

        console.log((values))
        values.preventDefault();
    }


    const changeProductName = (i, e) => {
        var temp = products
        temp[i]["name"] = e.target.value
        setProducts(temp)
    }

    const changeProductOption = (i, e) => {
        var temp = products
        temp[i]["option"] = e.target.value
        setProducts(temp)
    }

    const handlePriceChange = (i, e) => {

        var temp = products
        temp[i]["price"] = e.target.value
        setProducts(temp)

        var calTotal = 0

        console.log(products)
        products.map(product => {
            // console.log(product["price"])
            calTotal += parseFloat(product["price"])
        })

        // console.log(products)
        console.log(parseFloat(calTotal).toFixed(2))

        setTotal(parseFloat(calTotal).toFixed(2))
    }


    const renderRows = (prod) => {
        let rows = []
        console.log("Products is" + products.length)

        console.log(products)

        for (let i = 0; i <= productCounter; i++) {


            rows.push(<tr>
                <td>
                    <input type="text" name={`product[${productCounter}][name]`}
                           onChange={(e) => {
                               changeProductName(i, e)
                           }}
                           placeholder="Name"/>

                </td>
                <td>
                    <input type="text" name={`product[${productCounter}][option]`} placeholder="option"
                           onChange={(e) => {
                               changeProductOption(i, e)
                           }}/>
                </td>
                <td>
                    <input type="number" name={`product[${productCounter}][price]`} placeholder="0.00"
                           onChange={(e) => {
                               handlePriceChange(i, e)
                           }}
                    />
                </td>
            </tr>)
        }
        // setProducts(productsObj)
        return rows
    }
    const handleAddNewRow = (event) => {

        event.preventDefault();
        console.log(productCounter)
        if (productCounter != null) {
            console.log("inside if condition")
            setProductCounter(productCounter + 1)
        } else {


            console.log("inside else condition")
            setProductCounter(0)
        }

        var tempProducts = products
        tempProducts[tempProducts.length] = {
            name: null,
            option: null,
            price: 0.00

        }
        console.log(JSON.stringify(tempProducts))
        setProducts(tempProducts)

    }

    if (formSubmit) {


        return (
            <div className="Quote">
                <h2> {props.quotename}</h2>
                <p>
                    Attention: {data.first_name} {data.last_name}
                </p>
                <br/>
                Address: {data.billing_address}
                <br/>
                City:
                {data.city}
                <br/>
                Postal Code:
                {data.post_code}
                <br/>
                Phone:
                {data.phone_number}
                <br/>
                Email:
                {data.email}
                <br/>
                {data.products.length > 0 &&
                <table>
                    <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Option</td>
                        <td>Subtotal ($)</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.products.map(product => {
                            return (
                                <tr>
                                    <td>{product['name']}</td>
                                    <td>{product['option']}</td>
                                    <td>{product['price']}</td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
                }
                Notes to customer: {data.customer_notes}
                <br/>

                Notes to installers: {data.installer_notes}
                <br/>
                Estimator: {data.salesman}
                <br/>
                WSIB# {data.wsib}
                <br/>
                Account: {data.account}

                <br/>
                Firm # {data.firm}
                <br/>

            </div>
        )
    } else {
        console.log(products)
        return (
            <form onSubmit={handleSubmit}>
                <div className="Quote">
                    <h2> {props.quotename}</h2>
                    <p>
                        Attention:
                        <input type="text" className="inputclass" name="first_name"
                               placeholder="First Name" {...bindFirstName} />
                        <input type="text" className="inputclass" name="last_name"
                               placeholder="Last Name" {...bindLastName} />
                        <br/>
                        Address:

                        <input type="text" className="inputclass" name="billing_address"
                               placeholder="Billing Address" {...bindBillingAddress} />
                        <br/>
                        City:
                        <input type="text" className="inputclass" name="city"
                               placeholder="contractor city" {...bindCity} />

                        <br/>
                        Postal Code:

                        <input type="text" className="inputclass"
                               placeholder="contractor postal code" {...bindPostCode} />
                        <br/>
                        Phone:
                        <input type="text" className="inputclass" name="phone_number"
                               placeholder="contractor phone number" {...bindPhoneNumber} />

                        <br/>
                        Email:
                        <input type="text" className="inputclass" name="email"
                               placeholder="contractor email" {...bindEmail} />
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
                            {renderRows(products)}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan="3">
                                    <Button size="2" onClick={handleAddNewRow} varient="primary">Add+</Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">Total: ---------------------------------------------</td>
                                <td>${total}</td>
                            </tr>
                            </tfoot>
                        </table>

                        Notes to customer:
                        <input type="text" className="inputclass" name="customer_notes"
                               placeholder="Notes to Customer" {...bindCustomerNotes} />

                        <br/>

                        Notes to installers:
                        <input type="text" className="inputclass" name="installer_notes"
                               placeholder="Notes to installers" {...bindInstallerNotes} />

                        <br/>
                        Estimator:
                        <input type="text" className="inputclass" name="salesman"
                               placeholder="salesman Name" {...bindSalesman} />

                        <br/>
                        WSIB#
                        <input type="text" className="inputclass" name="wsib" placeholder="wsib" {...bindWsib} />

                        <br/>
                        Account
                        <input type="text" className="inputclass" name="account"
                               placeholder="Account No" {...bindAccount} />

                        <br/>
                        Firm #
                        <input type="text" className="inputclass" placeholder="Firm" {...bindFirm} />
                        <br/>
                        <br/>
                        <Button size="2" varient="primary" type="submit">Submit</Button>
                    </p>
                </div>
            </form>
        );
    }
}


export default QuoteOne;
