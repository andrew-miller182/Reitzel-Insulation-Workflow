import React, { useEffect, useState } from "react";
import { Input, Radio, message, Button , Modal, Form, Select, Switch, DatePicker, Card} from "antd";
import "./index.css";
import { getRegionAPI } from "../../api/customer";
import { getUsers } from "../../api/calendar";
const { Item } = Form;
const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const [showSiteInfo, setShowSiteInfo] = useState(false);
 const  [regions, setRegions] = useState([]);
 const [salesman, setSalesman] = useState([]);

 useEffect (() => {
   getRegions();
   getSalesmen();
 }, []);

  const getRegions = async () => {
    var result = await getRegionAPI();
    var regionlist = result.data.map((item) =>({
      id:item.RegionID,
      region:item.Region
    }));
    setRegions(regionlist);
  }

  const getSalesmen = async () => {
    var result = await getUsers();
    var saleslist = result.data.map((item) =>({
      id:item.UserID,
      firstName: item.FirstName
    }));
    setSalesman(saleslist);
  }

  const regionOptions = regions.map((item) => (
    <Option key={item.id}>{item.region}</Option>
  ));
  
  const salesList = salesman.map((item) => (
    <Option key={item.idD}>{item.firstName}</Option>
  ));
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSearch = (value) => {
    message.success(value);
  };
  const options = [
    { label: "New Customer", value: "customer" },
  ];

  return (
    <div className="content-searchbar">
      <Search
        allowClear
        className="searchbar"
        placeholder="Search"
        onSearch={onSearch}
        enterButton
      />
      <Radio.Group
        options={options}
        onChange={handleChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      ></Radio.Group>
      <Button
        onClick={() => {
          form.resetFields();
          setShowForm(true);
        }}>
        New Estimate
      </Button>
      <Modal 
      visible={showForm}
      title="New Estimate"
      onOk={() => {console.log("confirm")}}
      onCancel={() => {setShowForm(false)}}>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
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
              <Select>{regionOptions}</Select>
            </Item>
            <Item>
              <p>Use billing address:</p><Switch defaultChecked size="small" onChange={() => {setShowSiteInfo(true)}}></Switch>
            </Item>
            <Card title="Site Address Information" visible={showSiteInfo}>
            <Item
            label="Site Address"
            name="siteAddress"
            >
            <Input />
            </Item>
            <Item
            label="Site City"
            name="siteCity"
            >
              <Input />
            </Item>
            <Item
            label="Site Postal Code"
            name="sitePostal"
            >
              <Input />
            </Item>
            <Item 
            label="Site Region"
            name="siteRegion"
            >
              <Select>{regionOptions}</Select>
            </Item>
            
            </Card>
            <Item 
            label="Start Time"
            name="startDate"
            >
              <DatePicker 
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={() => console.log("date changed")} />
            </Item>
            <Item 
            label="End Time"
            name="endDate"
            >
              <DatePicker 
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={() => console.log("date changed")} />
            </Item>
            <Item
            label="Description"
            name="estimateInfo">
              <Input.TextArea />
            </Item>
            <Item 
            label="Assigned Salesman"
            name="UserID">
              <Select>{salesList}</Select>
            </Item>
        </Form>
      </Modal>
    </div>
  );
}
