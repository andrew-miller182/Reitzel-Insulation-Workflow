import React, { useEffect, useState } from "react";
import { getCustomers } from "../../api/customer";
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
      title: "FirstName",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "LastName",
    },

    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "BillingAddress",
      dataIndex: "BillingAddress",
      key: "BillingAddress",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
    {
      title: "PostalCode",
      dataIndex: "PostalCode",
      key: "PostalCode",
    },
    {
      title: "Operate",
      key: "operate",
      render: (data) => (
        <div className="operate-button">
          <Button
            type="primary"
            onClick={() => {
              setselectedData(data);
              setupdateShow(true);
              form.setFieldsValue({
                FirstName: data.FirstName,
                LastName: data.LastName,
                Phone: data.Phone,
                Email: data.Email,
                BillingAddress: data.BillingAddress,
                City: data.City,
                PostalCode: data.PostalCode,
                Region: data.Region,
              });
            }}
          >
            Modify
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setselectedData(data);
            }}
          >
            Delete
          </Button>
        </div>
      ),
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
    getCustomers().then((data) => {
      console.log("data", data);
      setorders(data.data);
    });
  }, []);
  return (
    <div>
      <Card bordered>
        <Table
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
                  message: "Cannot be Emptry!",
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
                  message: "Cannot be Emptry!",
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
                  message: "Cannot be Emptry!",
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
                  message: "Cannot be Emptry!",
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
                  message: "Cannot be Emptry!",
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
                  message: "Cannot be Emptry!",
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
                  message: "Cannot be Emptry!",
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
