import React, {useEffect, setState, useState} from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Select } from "antd";
import {getRegion, getAddresses, getCustomer, getCustomerAddresses} from '../../api/customer';
import { useRouteMatch } from "react-router-dom";

export default function CustomerInfo() {
 
  let match = useRouteMatch('/customerinfo/:customer').params.customer;
  const [customerInfo, setcustomerinfo] = useState([]);
  const [regionName, setRegionName] = useState([]);
    useEffect(() => {
        const func = async () => {
          var result = await getCustomer(match);
          var customerInfo = result.data.map((item) =>({
            id: item.CustomerID,
            firstName: item.FirstName,
            lastName: item.LastName,
            email: item.Email,
            phone: item.Phone,
            billing: item.BillingAddress,
            city: item.City,
            postal: item.PostalCode,
            region: item.Region
          }));
          setcustomerinfo(customerInfo[0]);
        };
        func();
        getRegionName();
      }, [customerInfo.length]);

    const getRegionName = async () => {
      var result = await getRegion(customerInfo.region);
      var name = result.data.map((item) =>({
        name: item.Region
      }))
      setRegionName(name[0]);
    }
      return(
        <div>
        <Card title="Customer Information">
            <p>First Name: {customerInfo.firstName}</p>
            <p>Last Name: {customerInfo.lastName}</p>
            <p>Email: {customerInfo.email}</p>
            <p>Phone: {customerInfo.phone}</p>
            <br />
            <p>Billing Address: {customerInfo.billing}</p>
            <p>City: {customerInfo.city}</p>
            <p>Postal Code: {customerInfo.postal}</p>
            <p>Region: {regionName.name}</p>
        </Card>

        </div>
      )
    }
