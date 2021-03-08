import React from 'react';
import Query from 'devextreme/data/query';
import {salesmanData} from './salesData.js';

function getSalesById(id) {
  return Query(salesmanData).filter(['id', id]).toArray()[0];
}

export default class SalesTooltip extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        salesData:getSalesById(props.data.appointmentData.salesman)
      };
    }
    render(){
    const { appointmentData } = this.state;
    return (
      <div>
          <div>
            <div>
              {this.props.text}
            </div>
            <div>
              Salesman: {appointmentData.salesData.name}
            </div>
            <div>
              Address: {this.props.billingAddress}
            </div>
          </div>
        </div>
    );
  }
  }