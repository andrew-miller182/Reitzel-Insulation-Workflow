import React, { useEffect } from "react";
import { Form, DatePicker, Input, Button, Select, message } from "antd";
import { addOrder, addEstimate } from "../../api/neworder";
import { datas } from "../../api/index";
import "./index.css";
const id = 0;
const { Item } = Form;
const { Option } = Select;
export default function NewEstimate(props) {
  const [form] = Form.useForm();
  const regions = [
    "Elmira & area",
    "Guelph & area",
    "Cambridge & area",
    "Hamilton & area",
    "Stratford & area",
    "Listowel area",
    "Greater Toronto Area",
    "Kitchener - Waterloo",
    "Brantford, Paris, Burford, Waterford, Brant County, Haldmald, Caledonia",
  ];
  const options = regions.map((item, index) => (
    <Option key={index + 1}>{item}</Option>
  ));
  const jobs = ["loosefill", "spray"];
  const options1 = jobs.map((item, index) => (
    <Option key={item}>{item}</Option>
  ));
  const salesman = datas.salesman;
  const options2 = salesman.map((item, index) => (
    <Option key={item}>{item}</Option>
  ));
  const regionId = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const options3 = regionId.map((item, index) => (
    <Option key={index + 1}>{item}</Option>
  ));
  const onFinish = async (values) => {
    console.log(values);
    var {
      FirstName,
      LastName,
      Phone,
      Email,
      BillingAddress,
      City,
      PostalCode,
      Region,
    } = values;
    var orders = {
      FirstName,
      LastName,
      Phone,
      Email,
      BillingAddress,
      City,
      PostalCode,
      Region,
    };
    var estimates = {};
    var result = await addOrder(orders);

    if (result.status == 200) {
      message.success("add success!");
      props.history.push("/orders");
    } else message.warn("fail");
  };
  const handleDate = () => {};
  useEffect(() => {}, []);
  return (
    <div className="neworder">
      <Form form={form} onFinish={onFinish} wrapperCol={{ span: 14 }}>
        <Item
          name="FirstName"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Item>
        <Item
          name="LastName"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Item>
        <Item
          name="BillingAddress"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="Billing Address" />
        </Item>
        <Item
          name="City"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="city" />
        </Item>
        <Item
          name="PostalCode"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="PostalCode" />
        </Item>
        <Item
          name="Phone"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Item>
        <Item
          name="Email"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Item>
        <Item
          name="Region"
          label="region"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Select>{options}</Select>
        </Item>
        <Item
          name="RegionID"
          label="regionID"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Select>{options3}</Select>
        </Item>
        <Item
          name="SiteAddress"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="Site Address" />
        </Item>
        <Item
          name="City"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="City" />
        </Item>
        <Item
          name="PostalCode1"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="PostalCode" />
        </Item>
        <Item
          name="startDate"
          label="start of time"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <DatePicker onChange={handleDate} className="datepicker" />
        </Item>
        <Item
          name="endDate"
          label="end of time"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <DatePicker onChange={handleDate} className="datepicker" />
        </Item>
        <Item
          name="JobType"
          label="Type of Job"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Select>{options1}</Select>
        </Item>
        <Item
          name="EstimateInfo"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Input placeholder="EstimateInfo" />
        </Item>
        <Item
          name="salesman"
          label="Assigned Salesman"
          rules={[
            {
              required: true,
              message: "Cannot be Empty",
            },
          ]}
        >
          <Select>{options2}</Select>
        </Item>
        <Item className="login_button">
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
            block
          >
            Add
          </Button>
        </Item>
      </Form>
    </div>
  );
}
