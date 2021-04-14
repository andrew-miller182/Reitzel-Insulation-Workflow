import React, {useEffect, setState, useState} from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Select, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {getRegion, updateCustomer, getRegionAPI, getCustomer, getCustomerAddresses, deleteCustomer, addAddress} from '../../api/customer';
import { Redirect, useRouteMatch, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { PropertiesPanel } from 'devextreme-react/diagram';
 const { Item } = Form;
const { confirm } = Modal;
const { Option } = Select;

export function CustomerInfo() {

  let match = useRouteMatch('/customerinfo/:customer').params.customer;
  const [showForm, setShowForm] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [formAddress] = Form.useForm();
  const [form1] = Form.useForm();
  const [regions, setRegions] = useState([]);
  const [customerInfo, setcustomerinfo] = useState([]);
  const [addressList, setAddressList] = useState([]);

  const options = regions.map((item) => (
    <Option key={item.id}>{item.name}</Option>
  ));
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
        getAddressList();
          getRegions();
        
      }, []);

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
      const getRegions = async() =>{
        var result = await getRegionAPI();
        var regionList = result.data.map((item) =>({
          id:item.RegionID,
          name:item.Region
        }));
        setRegions(regionList);
      }
      const title = (
        <div>
          <Space>

          
          <Button
            type="primary"
          onClick={() => {
              setShowForm(true);
              form1.setFieldsValue({
                firstName: customerInfo.firstName,
              lastName: customerInfo.lastName,
              email: customerInfo.email,
              phone: customerInfo.phone,
              billing: customerInfo.billing,
             city: customerInfo.city,
              postal: customerInfo.postal,
              region: customerInfo.region
             });
            }}
          >
            Modify
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleDeleteCustomer(customerInfo.id);
            }}
          >
            Delete
          </Button>
          </Space>
        </div>
      )
      const handleUpdate = async () => {
        const validResult = await form1.validateFields();
        if (validResult.errorFields && validResult.errorFields.length > 0) return;
        const value = form1.getFieldsValue();
        console.log(value);
        //const { firstName, lastName, email, phone, billing, city, postal, region } = value;
        const id = customerInfo.id;
        console.log("id", id);
        //update data in the backend
        const result = await updateCustomer(id, value.firstName, value.lastName, value.email, value.phone, value.billing, value.city, value.postal, value.region);
        setShowForm(false);
        console.log(result);
        if (result.status === 200) {
          message.success("Successfully updated customer information");
        }
      };
      const handleDeleteCustomer = async (id) => {
        confirm({
          title: "Are you sure you want to delete this customer?",
          icon: <ExclamationCircleOutlined />,
          content: "",
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk() {
            return new Promise((resolve, reject) => {
              const result = deleteCustomer(id);
              console.log(result);
              message.success("Customer has been successfully deleted");
              resolve();
              
            });
          },
          onCancel() {
            console.log("Cancel");
          },
        });
        
      }
      const handleNewAddress = async () =>{
        const validResult = await formAddress.validateFields();
        if (validResult.errorFields && validResult.errorFields.length > 0) return;
        const value = formAddress.getFieldsValue();
        const info = {
          BillingAddress: value.address,
          PostalCode: value.postalCode,
          City: value.city,
          Prov: value.prov,
          Region: value.region
        }
        let id = customerInfo.id;
        var result = await addAddress(id, info);
        console.log(result);
        if (result.status == 200){
          message.success("added new address");
        }
        setShowAddress(false);

      }
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
          <Card
          title = {title}
          >
        <Card title="Customer Information">
            <p>First Name: {customerInfo.firstName}</p>
            <p>Last Name: {customerInfo.lastName}</p>
            <p>Email: {customerInfo.email}</p>
            <p>Phone: {customerInfo.phone}</p>
            <br />      
        </Card>
        <Card title="Billing Address">
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
          <Button
          type="primary"
          onClick={() => {
            setShowAddress(true);
            formAddress.resetFields();
          }}
          >New Address</Button>

          <Modal
          visible={showForm}
          title="Update Customer"
          onOk={handleUpdate}
          onCancel={() => setShowForm(false)}
        >
          <Form form={form1} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
                
              ]}
              
            >
              <Input />
            </Item>
            <Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Email"
              name="email"
            >
              <Input />
            </Item>
            <Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Billing Address"
              name="billing"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Postal Code"
              name="postal"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input />
              </Item>
              <Item
              label="Region"
              name="region"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Select>{options}</Select>
            </Item>
          </Form>
        </Modal>
        <Modal
          visible={showAddress}
          title="New Address"
          onOk={handleNewAddress}
          onCancel={() => setShowAddress(false)}
          >
          <Form
              form={formAddress}
              labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}
              >
              <Item 
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
              >
                <Input />
              </Item>
              <Item 
              label="Postal Code"
              name="postalCode"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
              >
                <Input />
              </Item>
              <Item 
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
              >
                <Input />
              </Item>
              <Item 
              label="Province"
              name="prov"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
              >
                <Input />
              </Item>
              <Item 
              label="Region"
              name="region"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Select>{options}</Select>
              </Item>

          </Form>
        </Modal>
        </Card>
        </div>
      )
    }

    export default withRouter(CustomerInfo)