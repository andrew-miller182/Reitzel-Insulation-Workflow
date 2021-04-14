import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../component/quotes/Button";
import { useInput } from "../../hooks/input-hook";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "../../component/quotes/CustomSelect";
import { useParams } from "react-router";
import qData from "./quoteData.js";
import Headerforquoto from "../headforquote";
import Footerforquoto from "../footer";
import { sendQuote } from "../../api/quotes";
import { message } from "antd";


function printQuote() {
  var content = document.getElementById("printContents");
  var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
}

function emailQuote(customer){
  var content = document.getElementById("printContents");
  var email = sendQuote(customer, content.innerHTML);
  message.success("Email sent");
}

function QuotePrint(props) {
  let { qid } = useParams();

  let history = useHistory();

  let quotes = qData.quote_data;
  let selectedQuote = parseInt(qid)
    ? quotes.find((d) => {
        return parseInt(d.id) == parseInt(qid);
      })
    : {};

  if (Object.keys(selectedQuote).length == 0) {
    history.push(`/quotes`);
  }

  const [quoteData, setQuoteData] = useState({});

  useEffect(() => {
    setQuoteData(selectedQuote);
  }, [selectedQuote]);

  const [quoteFormData, setQuoteFormData] = useState(props.quoteFormData);

  console.log(quoteFormData);
  return (
    <div>
      <div
        id="printContents"
        className="Quote print-page"
        style={{ width: "80%", margin: "auto" }}
      >
        <Headerforquoto />
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
            <table width="100%" border="1" cellPadding="10px">
              <thead>
                <tr>
                  <td>Product Info</td>
                  <td width="10%">Subtotal ($)</td>
                </tr>
              </thead>
              <tbody>
                {quoteFormData.products.map((product) => {
                  if (product["isProduct"])
                    return (
                      <tr>
                        <td>
                          {product["name"]} <br></br>
                          {product["option"]}
                          <br></br>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {product["price"]}
                        </td>
                      </tr>
                    );
                  else
                    return (
                      <tr>
                        <td colSpan="2">{product["detail"]}</td>
                      </tr>
                    );
                })}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "2px solid black" }}>
                  <td style={{ textAlign: "right" }}>Subtotal ($)</td>
                  <td style={{ textAlign: "right" }}>
                    {quoteFormData.subtotal}{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Tax %</td>
                  <td style={{ textAlign: "right" }}>
                    {quoteFormData.taxper}{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Tax $</td>
                  <td style={{ textAlign: "right" }}>{quoteFormData.tax}</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Total ($)</td>
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
              <Footerforquoto />
      </div>
      <button onClick={printQuote}> Print this Quote</button>
      <button onClick={() => emailQuote(quoteFormData.email)}> Send as Email</button> 
      <iframe
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      ></iframe>
    </div>
  );
}

export default QuotePrint;
