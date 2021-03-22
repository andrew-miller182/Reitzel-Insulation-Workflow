import React, {useEffect, setState, useState} from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Select } from "antd";
import {getQuotes, getAddress, getRegion} from '../../api/addresses';
import { useRouteMatch } from "react-router-dom";

export default function AddressInfo() {
 
  let match = useRouteMatch('/addressinfo/:address').params.address;
  const [addressInfo, setaddressinfo] = useState([]);
  const [regionName, setRegionName] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    useEffect(() => {
        const func = async () => {
          var result = await getAddress(match);
          var addressInfo = result.data.map((item) =>({
            id: item.AddressID,
            address: item.Address,
            city: item.City,
            postal: item.PostalCode,
            region: item.Region
          }));
          setaddressinfo(addressInfo[0]);
        };
        func();
        getQuoteList();
        getRegionName();
      }, [addressInfo.length]);

    const getRegionName = async () => {
      var result = await getRegion(addressInfo.region);
      var name = result.data.map((item) =>({
        name: item.Region
      }))
      setRegionName(name[0]);
    }
    const getQuoteList = async () => {
        var result = await getQuotes(match);
        var quotes = result.data.map((item) =>({
          id: item.QuoteID,
          user: item.UserID,
          info: item.QuoteInfo,
          date: item.creationDate,
          startdate: item.startDate,
          enddate: item.endDate
        }));
        setQuoteList(quotes);
        console.log(quotes);
      };
    const columns =[
      {
        title:"Creation Date",
        dataIndex:"date",
        key:"date"
      },
      {
        title:"Salesman",
        dataIndex:"user",
        key:"user"
      },
      {
        title:"Info",
        dataIndex:"info",
        key:"info"
      },
      {
        title:"Show Quote Info",
        key:"OpenQuote",

      }   

    ]
      return(
        <div>
        <Card title="Address Information">
            
        </Card>
        <h2>Quotes</h2>
        <Table
        style={{ width: "80%", margin: "0 auto" }}
        rowKey="id"
        bordered
        dataSource={quoteList}
        columns={columns}
        tableLayout="auto"
        pagination={{ pageSize: 10 }}>

          </Table>
          </div>
      )
    }