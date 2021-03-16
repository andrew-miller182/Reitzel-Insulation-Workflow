import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Button from "../../component/quotes/Button";
import {useInput} from '../../hooks/input-hook';
import {useSelector, useDispatch} from "react-redux";
import CustomSelect from "../../component/quotes/CustomSelect";
import qData from './quoteData.js';


function printQuote(){
    var content = document.getElementById("printContents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
}

function QuotePrint(props) {

    let history = useHistory();

    const [quoteData, setQuoteData] = useState(props.quoteData);
    const [quoteFormData, setQuoteFormData] = useState(props.quoteFormData);

    

   console.log(quoteFormData);
    return (
			<div>
				<div
					id="printContents"
					className="Quote print-page"
					style={{ width: "80%", margin: "auto" }}
				>
					<h2> {quoteData.name}</h2>
					<p>
						<strong>Attention TO:</strong> {quoteFormData.first_name}{" "}
						{quoteFormData.last_name}
						<br /> Address: {quoteFormData.billing_address}
						<br /> City: {quoteFormData.city}
						<br /> Postal Code: {quoteFormData.post_code}
						<br /> Phone: {quoteFormData.phone_number}
						<br /> Email: {quoteFormData.email}
						<br />
					</p>
					<p>{quoteFormData.details}</p>
					<p>
						{quoteFormData.products.length > 0 && (
							<table>
								<thead >
									<tr>
										<td>Product Name</td>
										<td>Option</td>
										<td>Subtotal ($)</td>
									</tr>
								</thead>
								<tbody>
									{quoteFormData.products.map((product) => {
										return (
											<tr>
												<td>{product["name"]}</td>
												<td>{product["option"]}</td>
												<td style={{ textAlign: "right" }}>
													{product["price"]}
												</td>
											</tr>
										);
									})}
								</tbody>
                                <tfoot>
                                    <tr style={{ borderTop: "2px solid black" }}>
										<td></td>
										<td>Tax %</td>
										<td style={{ textAlign: "right" }}>{quoteFormData.taxper} </td>
									</tr>
                                    <tr>
										<td></td>
										<td>Tax $</td>
										<td style={{ textAlign: "right" }}>{quoteFormData.tax}</td>
									</tr>
                                    <tr>
										<td></td>
										<td>Total ($)</td>
										<td style={{ textAlign: "right" }}>{quoteFormData.total}</td>
									</tr>
                                </tfoot>
							</table>
						)}
					</p>
					<p>Notes to customer: {quoteFormData.customer_notes}</p>
					<p>Notes to installers: {quoteFormData.installer_notes}</p>
					<p>Estimator: {quoteFormData.salesman}</p>
					<p>
						WSIB# {quoteFormData.wsib} &nbsp; Account: {quoteFormData.account}{" "}
						&nbsp; Firm # {quoteFormData.firm}
					</p>
				</div>
				<button onClick={printQuote}> Print this Quote</button>
				<iframe
					id="ifmcontentstoprint"
					style={{ height: "0px", width: "0px", position: "absolute" }}
				></iframe>
			</div>
		);
}


export default QuotePrint;
