import React, {useState, useEffect} from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Button from "../../component/quotes/Button";
import {useInput} from '../../hooks/input-hook';
import { useParams } from "react-router";
import {useSelector, useDispatch} from "react-redux";
import CustomSelect from "../../component/quotes/CustomSelect";
import qData from './quoteData.js';



function QuoteOne(props) {
    
    let { qid } = useParams();

    let { path, url } = useRouteMatch();
    let history = useHistory();

    const {value, bind, reset} = useInput('');
    
    const data = useSelector( state => state.quoteOneReducer.quote_one);
    
    let  quotes = qData.quote_data;
    let selectedQuote  = (parseInt(qid)) ? quotes.find((d) => { return parseInt(d.id) == parseInt(qid) }): {};
    
    
    if(Object.keys(selectedQuote).length == 0){
        history.push(`/quotes`);
    }
    
    const [quoteData, setQuoteData] = useState({});
    
    
    
    useEffect(() => {
        setQuoteData(selectedQuote);
    },[selectedQuote]);

    const dispatch = useDispatch();
    const {value: firstName, bind: bindFirstName, reset: resetFirstName,assignValue: assignFirstName} = useInput();
    const {value: lastName, bind: bindLastName, reset: resetLastName,assignValue: assignLastName} = useInput();
    const {value: billingAddress, bind: bindBillingAddress, reset: resetBillingAddress, assignValue: assignBillingAddress} = useInput();
    const {value: city, bind: bindCity, reset: resetCity, assignValue: assignCity} = useInput();
    const {value: postCode, bind: bindPostCode, reset: resetPostCode,assignValue: assignPostCode} = useInput();
    const {value: phoneNumber, bind: bindPhoneNumber, reset: resetPhoneNumber, assignValue: assignPhoneNumber} = useInput();
    const {value: email, bind: bindEmail, reset: resetEmail, assignValue: assignEmail} = useInput();
    const {value: customerNotes, bind: bindCustomerNotes, reset: resetCustomerNotes, assignValue: assignCustomerNotes} = useInput();
    const {value: installerNotes, bind: bindInstallerNotes, reset: resetInstallerNotes, assignValue: assignInstallerNotes} = useInput();
    const {value: salesman, bind: bindSalesman, reset: resetSalesman, assignValue: assignSalesman} = useInput();
    const {value: wsib, bind: bindWsib, reset: resetWsib} = useInput(quoteData.wsib);
    const {value: account, bind: bindAccount, reset: resetAccount} = useInput(quoteData.account);
    const {value: firm, bind: bindFirm, reset: resetFirm} = useInput(quoteData.firm);
    const {value: details, bind: bindDetails, reset: resetDetails} = useInput(quoteData.details);

    const [productCounter, setProductCounter] = useState(1)
    const [products, setProducts] = useState([{
        isProduct: false,
        detail: "",
        name: null,
        option: null,
        price: 0.00,
        detail: ""
    },{
        isProduct: true,
        detail: "",
        name: null,
        option: null,
        price: 0.00,
        detail: ""
    }])

    const customers = qData.customer_data;

    function onCustomerSelect(e) {
        if ((e == null || e == "" || e == undefined)) {
            
        } else {
            let cust = customers.find((c) => { return parseInt(c.id) == parseInt(e) });
            assignFirstName(cust.first_name)
            assignLastName(cust.last_name)
        }
    }
    const [formSubmit, setFormSubmit] = useState(false)
    
    const handleSubmit = (evt) => {

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
            products: products,
            subtotal: subtotal,
            taxper: taxper,
            tax: tax,
            total: total,
            details: details
        }

        dispatch({
            type: "quote_one",
            payload: payload
        })

        props.onSetQuoteFormDataChange(payload);
        reset();
        evt.preventDefault();
    }

    const [manualcalc, setManualcalc] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [taxper, setTaxper] = useState(13)
    const [tax, setTax] = useState(0)

    const handleSubmitEvent = (values) => {
        console.log((values))
        values.preventDefault();
    }

    const handleManualcalc = (e) => {
        if(!manualcalc)
            setManualcalc(true)
        else
            setManualcalc(false)
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
    
    const handleDetailChange = (i, e) => {
        var temp = products
        temp[i]["detail"] = e.target.value
        temp[i]["detail"].replace(/(?:\r\n|\r|\n)/g, '<br />')
        setProducts(temp)
    }

    const handlePriceChange = (i, e) => {

        var temp = products
        temp[i]["price"] = e.target.value
        
        setProducts(temp)
        totalCalc();
    }

    const changeTaxper = (e) => {
        var temp = e.target.value;
        setTaxper(temp)
        totalCalc();
    }

    const changeTax = (e) => {
        var temp = e.target.value;
        setTax(temp)
    }


    const changeSubtotal = (e) => {
        var temp = e.target.value;
        setSubtotal(temp)
    }
    
    const changeTotal = (e) => {
        var temp = e.target.value;
        setTotal(temp)
    }

    const totalCalc = () => {
        var temp = products
        var calSubtotal = 0.00;
        var calTotal = 0.00;
        temp.forEach((p) => {
            calSubtotal = (calSubtotal + parseFloat(p["price"]));
        })
        setSubtotal(parseFloat(calSubtotal).toFixed(2));
        var taxc = ((calSubtotal * taxper)/100);
        setTax(parseFloat(taxc).toFixed(2))
        console.log(calSubtotal);
        calTotal = (parseFloat(calSubtotal) + parseFloat(taxc));
        console.log(calTotal);
        setTotal(parseFloat(calTotal).toFixed(2))
    }

    const renderRows = (prod) => {
        let rows = []

        for (let i = 0; i <= productCounter; i++) {

            if(products[i]["isProduct"]){
                rows.push(
                <tr>
                    <td>
                        <input type="text" name={`product[${productCounter}][name]`}
                            onChange={(e) => {
                                changeProductName(i, e)
                            }}
                            className="ant-input"
                            placeholder="Name"/>

                    </td>
                    <td>
                        <input type="text" name={`product[${productCounter}][option]`} placeholder="option"
                            className="ant-input"
                            onChange={(e) => {
                                changeProductOption(i, e)
                            }}/>
                    </td>
                    <td>
                        <input type="number" name={`product[${productCounter}][price]`} placeholder="0.00" 
                            defaultValue="0.00"
                            className="ant-input"
                            onChange={(e) => {
                                handlePriceChange(i, e)
                            }}
                        />
                    </td>
                    <td style={{textAlign:"right"}}>
                    <Button size="sm" variant="danger"  onClick={(e) => { handleRemoveRow(i,e)}} >x</Button>
                    </td>
                </tr>);
            }else{
                rows.push(
                <tr>
                    <td colSpan="2">
                        <textarea name={`product[${productCounter}][detail]`} cols="30" rows="3" 
                            placeholder="Quote Details"
                            className="ant-input"
                            onChange={(e) => {
                                handleDetailChange(i, e)
                            }}
                        >
                        </textarea>
                    </td>
                    <td></td>
                    <td style={{textAlign:"right"}}>
                        <Button size="sm" variant="danger"  onClick={(e) => { handleRemoveRow(i,e)}} >x</Button>
                    </td>
                </tr>)
                }
        }
        return rows
    }

    const handleRemoveRow = (i,e) => {
        e.preventDefault();
        products.splice(i,1);
        setProductCounter(productCounter-1);
    }

    const handleAddNewRow = (event,value) => {

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
            isProduct: value,
            detail: "",
            name: null,
            detail: "",
            option: null,
            price: 0.00
        }
        setProducts(tempProducts)
    }
        
    return (
        <form onSubmit={handleSubmit}>
            <div className="Quote" style={{width:"80%"}}>
                <h2> {quoteData.name}</h2>
                <p>
                    Select Customer:
                    <CustomSelect data={customers} onSelectChange={onCustomerSelect}/>
                    <br/>
                    <br/>
                    Customer:
                    <input type="text" className="ant-input ant-col-8" name="first_name"
                            placeholder="First Name" {...bindFirstName} />
                    <input type="text" className="ant-input ant-col-8" name="last_name"
                            placeholder="Last Name" {...bindLastName} />
                    <br/>
                    Address:
                    <input type="text" className="ant-input" name="billing_address"
                            placeholder="Billing Address" {...bindBillingAddress} />
                    <br/>
                    City:
                    <input type="text" className="ant-input" name="city"
                            placeholder="contractor city" {...bindCity} />

                    <br/>
                    Postal Code:

                    <input type="text" className="ant-input"
                            placeholder="contractor postal code" {...bindPostCode} />
                    <br/>
                    Phone:
                    <input type="text" className="ant-input" name="phone_number"
                            placeholder="contractor phone number" {...bindPhoneNumber} />

                    <br/>
                    Email:
                    <input type="text" className="ant-input" name="email"
                            placeholder="contractor email" {...bindEmail} />
                    <br/>
                    Quotes Details:
                    <input  className="ant-input ant-textarea" name="details"
                            placeholder="Quote Details" {...bindDetails}  />
                    <br/>
                    <table style={{width:"100%"}}>
                        <thead>
                        <tr>
                            <td>Product Name</td>
                            <td>Option</td>
                            <td style={{textAlign:"right", width:"10%"}}>Subtotal ($)</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {renderRows(products)}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3">
                                <Button onClick={(e) => { handleAddNewRow(e,true)}} variant="primary" size="sm" >Add Product</Button>
                                <span> </span>
                                <Button onClick={(e) => {handleAddNewRow(e,false)}} variant="primary" size="sm" >Add Detail</Button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign : "right"}}>Sub Total : </td>
                            <td><input  className="ant-input ant-textarea" name="details" type="number" step="0.01" readOnly={!manualcalc}
                            placeholder="Quote Total" value={subtotal} 
                            onChange={(e) => {
                            changeSubtotal(e)
                            }}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign : "right"}}>Tax % : </td>
                            <td><input  className="ant-input ant-textarea" name="details" type="number" step="0.01" readOnly={!manualcalc}
                            placeholder="Quote Tax %" value={taxper} 
                            onChange={(e) => {
                            changeTaxper(e)
                            }}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign : "right"}}>Tax Calc : </td>
                            <td><input  className="ant-input ant-textarea" name="details" type="number" step="0.01" readOnly={!manualcalc}
                            placeholder="Quote Tax $" value={tax} 
                            onChange={(e) => {
                            changeTax(e)
                            }}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign : "right"}}>Total : </td>
                            <td><input  className="ant-input ant-textarea" name="details" type="number" step="0.01" readOnly={!manualcalc}
                            placeholder="Quote Total" value={total} 
                            onChange={(e) => {
                            changeTotal(e)
                            }}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign : "left"}}> </td>
                            <td> Overried : <input  className="ant-checkbox" name="manual" type="checkbox" defaultChecked={manualcalc} 
                            onChange={(e) => { handleManualcalc(e)
                            }}
                            /></td>
                        </tr>
                        </tfoot>
                    </table>

                    Notes to customer:
                    <input type="text" className="ant-input" name="customer_notes"
                            placeholder="Notes to Customer" {...bindCustomerNotes} />

                    <br/>

                    Notes to installers:
                    <input type="text" className="ant-input" name="installer_notes"
                            placeholder="Notes to installers" {...bindInstallerNotes} />

                    <br/>
                    Estimator:
                    <input type="text" className="ant-input" name="salesman"
                            placeholder="salesman Name" {...bindSalesman} />

                    <br/>
                    WSIB: #
                    <input type="text" className="ant-input" name="wsib" placeholder="wsib" {...bindWsib} />

                    <br/> <br/>
                    Account:  #{account}
                    <br/>
                    Firm: #{firm}
                    <br/>
                    <br/>
                    <Button size="md" variant="primary" type="submit" class="ant-btn ant-btn-primary">Submit</Button>
                </p>
            </div>
        </form>
    );
}


export default QuoteOne;
