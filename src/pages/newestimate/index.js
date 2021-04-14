import React, { useEffect, useState } from "react";
import { Form, DatePicker, Input, Button, Select, message, Card } from "antd";
import {
  addOrder,
  addEstimate,
  getLatestCustomer,
  addAddress,
  getLatestAddress,
} from "../../api/neworder";
import { getRegionAPI, getUsers } from "../../api/calendar";
import "./index.css";
import TextArea from "antd/lib/input/TextArea";
const { RangePicker } = DatePicker;
const { Item } = Form;
const { Option } = Select;
const { format } = require("date-fns-tz");

export default function NewEstimate(props) {
  const [info, setInfo] = useState(false);
  const [salesmen, setSalesmen] = useState([]);
  const [regions, setRegions] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const options = regions.map((item) => (
    <Option key={item.id}>{item.region}</Option>
  ));
  const jobs = ["loosefill", "spray"];
  const options1 = jobs.map((item, index) => (
    <Option key={item}>{item}</Option>
  ));

  const getregions = async () => {
    const data = await getRegionAPI();
    let regionData = data.data.map((item) => ({
      id: item.RegionID,
      region: item.Region,
      color: item.color,
    }));
    setRegions(regionData);
  };

  const getsalesmen = async () => {
    const data = await getUsers();
    let salesData = data.data.map((item) => ({
      id: item.UserID,
      FirstName: item.FirstName,
      LastName: item.LastName,
    }));
    setSalesmen(salesData);
  };

  const options2 = salesmen.map((item) => (
    <Option key={item.id}>{item.FirstName}</Option>
  ));

  const onFinish = async (values) => {
    console.log(values);
    var customer = {
      FirstName: values.FirstName,
      LastName: values.LastName,
      Phone: values.Phone,
      Email: values.Email,
      BillingAddress: values.BillingAddress,
      City: values.City,
      Prov: values.Prov,
      PostalCode: values.PostalCode,
      Region: values.Region,
    };
    var siteAddress = {
      BillingAddress: values.siteAddress,
      City: values.siteCity,
      Prov: values.siteProv,
      PostalCode: values.sitePostal,
    };
    var estimate = {
      UserID: values.salesman,
      JobType: values.JobType,
      Region: values.Region,
      startDate: format(
        values.selectedDate[0]._d,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      ),
      endDate: format(
        values.selectedDate[1]._d,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
      ),
      estimateInfo: values.EstimateInfo,
    };
    console.log("estimate", estimate);
    console.log("site", siteAddress);
    var result = await addOrder(customer);

    if (result.status == 200) {
      message.success("add success!");
    } else message.warn("fail");
    var getCustomerID = await getLatestCustomer();
    var latestCustomer = getCustomerID.data[0].CustomerID;
    console.log("customerID", getCustomerID);
    var newAddress = await addAddress(latestCustomer, customer);
    if (siteAddress.BillingAddress !== undefined) {
      var siteAddressSent = await addAddress(latestCustomer, siteAddress);
    }
    var getAddressID = await getLatestAddress();
    var latestAddress = getAddressID.data[0].CustomerID;
    console.log(latestAddress);
    console.log("addressID", getAddressID);
    var estimateResult = await addEstimate(
      latestCustomer,
      getAddressID.data[0].AddressID,
      estimate
    );
    props.history.push("/home");
  };

  useEffect(() => {
    getsalesmen();
    getregions();
    if (salesmen != [] && regions != []) {
      setInfo(true);
    }
  }, []);
  if (info != true) {
    return <p>Loading Information...</p>;
  } else {
    return (
      <div className="neworder">
        <Card>
          <Form form={form} onFinish={onFinish} {...layout}>
            <Item
              label="First Name"
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
              label="Last Name"
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
              label="Billing Address"
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
              label="City"
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
              label="Province"
              name="Prov"
              rules={[
                {
                  required: true,
                  message: "Cannot be Empty",
                },
              ]}
            >
              <Input placeholder="Province" />
            </Item>
            <Item
              label="Postal Code"
              name="PostalCode"
              rules={[
                {
                  required: true,
                  message: "Cannot be Empty",
                },
              ]}
            >
              <Input placeholder="Postal Code" />
            </Item>
            <Item
              label="Phone"
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
            <Item label="Email Address" name="Email">
              <Input placeholder="Email" />
            </Item>
            <Item
              name="Region"
              label="Region"
              rules={[
                {
                  required: true,
                  message: "Cannot be Empty",
                },
              ]}
            >
              <Select>{options}</Select>
            </Item>
            <i>
              Only fill in site address information if different than billing
              address
            </i>
            <br />
            <i>---</i>
            <Item label="Site Address" name="siteAddress">
              <Input placeholder="Address" />
            </Item>
            <Item label="Site City" name="siteCity">
              <Input placeholder="City" />
            </Item>
            <Item label="Site Province" name="siteProv">
              <Input placeholder="Province" />
            </Item>
            <Item label="Postal Code" name="sitePostal">
              <Input placeholder="Postal Code" />
            </Item>
            <Item name="siteRegion" label="Site Region">
              <Select>{options}</Select>
            </Item>
            <i>---</i>
            <Item
              name="selectedDate"
              label="Time"
              rules={[
                {
                  required: true,
                  message: "Cannot be Empty",
                },
              ]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                className="datepicker"
              />
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
              label="Information"
              name="EstimateInfo"
              rules={[
                {
                  required: true,
                  message: "Cannot be Empty",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Estimate Information" />
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
                Create Estimate
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    );
  }
}
