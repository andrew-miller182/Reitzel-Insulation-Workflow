import React, { useState, useEffect, Link } from "react";
import { Card, Table, Button, Modal, Form, Input, message, Select } from "antd";
import {getCustomers, getAddresses} from '../../api/customer';
import './index.css';

export default function Customers() {

const [customers, setcustomers] = useState([]);
const [addressList, setaddresses] = useState([]);
const [form1] = Form.useForm();
const [formData, setFormData] = useState([]);
const [showForm, setShowForm] = useState(false);

const columns = [
  {
    title:"First Name",
    dataIndex:"firstName",
    key:"FirstName"
  },
  {
    title:"Last Name",
    dataIndex:"lastName",
    key:"LastName"
  },
  {
    title:"Customer Billing Address",
    dataIndex:"billing",
    key:"BillingAddress"
  },
  {
    title:"See Customer Page",
    key:"OpenCustomer",
    render: (data) => ( 
    <div className="operate-button">
          <Button
          type="link"
          href={`/customerinfo/${data.id}`}
            >
           Show Customer
          </Button>
         </div>)}

];
  useEffect(() => {
    const func = async () => {
      var result = await getCustomers();
      var tables = result.data.map((item) => ({
        id: item.CustomerID,
        firstName: item.FirstName,
        lastName: item.LastName,
        billing: item.BillingAddress
      }));
      setcustomers(tables);
    };
    func();
  }, [customers.length]);

  return (
    <div>
      <Table
    style={{ width: "80%", margin: "0 auto" }}
    rowKey="id"
    bordered
    dataSource={customers}
    columns={columns}
    tableLayout="auto"
    pagination={{ pageSize: 10 }}
  ></Table>
  
    </div>
    
  )
}