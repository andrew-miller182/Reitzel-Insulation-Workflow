import React from 'react';
import Query from 'devextreme/data/query';
import {salesmanData} from './salesData.js';

function getSalesById(id) {
  return Query(salesmanData).filter(['name', id]).toArray()[0];
}

export default class SalesTooltip extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        salesData:getSalesById(props.data.appointmentData.id)
      };
    }
    render(){
    const { appointmentData } = this.state;
    return (
      <div>
          <div>
            <div>
              {appointmentData.description}
            </div>
            <div>
              Salesman: {appointmentData.salesData}
            </div>
            <div>
              Address: {appointmentData.billingAddress}
            </div>
          </div>
        </div>
    );
  }
  }