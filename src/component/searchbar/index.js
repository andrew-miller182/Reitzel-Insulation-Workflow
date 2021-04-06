import React, { useState } from "react";
import { Input, Radio, Form, message, Modal, Button } from "antd";
import Orders from "../../pages/orders";
import "./index.css";
import { withRouter } from "react-router";

const { Search } = Input;
const id=0;
function Searchbar(props) {
  const [value, setValue] = useState("");
  const [newOrderShow, setNewOrderShow] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value == "order") {
      props.history.push("/neworders");
    }
  };
  const onSearch = (value) => {
    message.success(value);
  };
  // const handleOk = () => {
  //   setNewOrderShow(false);
  // };
  // const handleCancel = () => {
  //   setNewOrderShow(false);
  // };
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
      {/* <Modal
        visible={newOrderShow}
        title="Add New Order"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Orders />
      </Modal> */}
    </div>
  );
}
export default withRouter(Searchbar);
