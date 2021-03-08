import React from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import Main from "../main";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.css";
import Leftnav from "../leftnav";
import Head from "../head";
import { getUser } from "../../util/storage";
import jwt from "jsonwebtoken";
import Searchbar from "../searchbar";
import { datas } from "../../api/index";
const { Header, Content, Footer, Sider } = Layout;

export default class Homepage extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Sider>
          <Leftnav
            role={datas.user[0].role}
            imgUrl={datas.user[0].imgUrl}
          ></Leftnav>
        </Sider>
        <Layout className="main-layout">
          <Header className="header">
            <Head username={datas.user[0].loginId} />
          </Header>

          <Content className="content">
            <Searchbar />
            <Main />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2021 Created by Team Explorers
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
