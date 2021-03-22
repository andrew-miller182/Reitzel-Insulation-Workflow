import React, {useEffect, setState, useState} from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Select } from "antd";
import {getRegion, getAddresses, getCustomer, getCustomerAddresses} from '../../api/customer';
import { useRouteMatch } from "react-router-dom";
import Tab from '../../Components/HomeTemplate/Tab';

export default function CustomerInfo() {
 
  let match = useRouteMatch('/customerinfo/:customer').params.customer;
  const [customerInfo, setcustomerinfo] = useState([]);
  const [regionName, setRegionName] = useState([]);
  const [addressList, setAddressList] = useState([]);
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
        getAddressList();
      }, [customerInfo.length]);

    const getRegionName = async () => {
      var result = await getRegion(customerInfo.region);
      var name = result.data.map((item) =>({
        name: item.Region
      }))
      setRegionName(name[0]);
    }
    const getAddressList = async () => {
        var result = await getCustomerAddresses(match);
        var addresses = result.data.map((item) =>({
          id: item.AddressID,
          address: item.Address,
          postalcode: item.PostalCode,
          city: item.City,
          prov: item.Province,
          region: item.Region
        }));
        setAddressList(addresses);
        console.log(addresses);
      };
    const columns =[
      {
        title:"Address",
        dataIndex:"address",
        key:""
      },
      {
        title:"Postal Code",
        dataIndex:"postalcode",
        key:""
      },
      {
        title:"City",
        dataIndex:"city",
        key:""
      },
      {
        title:"Province",
        dataIndex:"prov",
        key:""
      },
      {
        title:"Region",
        dataIndex:"region",
        key:""
      },
      {
        title:"Show Address Info",
        key:"OpenAddress",
      render: (data) => ( 
      <div className="operate-button">
          <Button
          type="link"
          href={`/addressinfo/${data.id}`}
            >
           Show Address Details
          </Button>
         </div>)
      }   

    ]
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
            
        </Card>
        <Table
        style={{ width: "80%", margin: "0 auto" }}
        rowKey="id"
        bordered
        dataSource={addressList}
        columns={columns}
        tableLayout="auto"
        pagination={{ pageSize: 10 }}>

          </Table>
        </div>
      )
    }
