import React, { useEffect, useState } from "react";
import { getEstimates } from "../../api/neworder";
import { Input, Table, Form, Modal, Card, Select, Button } from "antd";
import "./index.css";
const { Item } = Form;
const { Option } = Select;
const id = 0;
export default function Orders() {
  const [form] = Form.useForm();
  //form ref to control the adding form

  const [updateShow, setupdateShow] = useState(false);
  const [orders, setorders] = useState([]);
  const handleUpdate = () => {
    setupdateShow(false);
  };
  const handleCancel = () => {
    setupdateShow(false);
  };
  const onFinish = () => {
    setupdateShow(false);
  };
  //the selected to be updated or deleted data
  const [selectedData, setselectedData] = useState({});
  const columns = [
    {
      title: "EstimateID",
      dataIndex: "EstimateID",
      key: "EstimateID",
    },

    {
      title: "CustomerID",
      dataIndex: "CustomerID",
      key: "CustomerID",
    },
    {
      title: "UserID",
      dataIndex: "UserID",
      key: "UserID",
    },
    {
      title: "JobType",
      dataIndex: "JobType",
      key: "JobType",
    },
    {
      title: "EstimateInfo",
      dataIndex: "EstimateInfo",
      key: "EstimateInfo",
    },
    {
      title: "CreationDate",
      dataIndex: "CreationDate",
      key: "CreationDate",
    },
    {
      title: "CreationDate",
      dataIndex: "CreationDate",
      key: "CreationDate",
    },
    {
      title: "startDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "endDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "RegionID",
      dataIndex: "RegionID",
      key: "RegionID",
    },
  ];
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
  useEffect(() => {
    getEstimates().then((data) => {
      console.log("data", data);
      setorders(data.data);
    });
  }, []);
  return (
    <div>
      <Card bordered>
        <Table
          scroll={{ x: 1300 }}
          style={{ width: "80%", margin: "0 auto" }}
          rowKey="Phone"
          bordered
          dataSource={orders}
          columns={columns}
          tableLayout="auto"
          pagination={{ pageSize: 3 }}
        ></Table>
        <Modal
          visible={updateShow}
          title="Update"
          onOk={handleUpdate}
          onCancel={handleCancel}
        >
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
              rules={[
                {
                  required: true,
                  message: "Cannot be Empty",
                },
              ]}
            >
              <Select>{options}</Select>
            </Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
