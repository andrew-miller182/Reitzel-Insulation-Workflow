import React from 'react';
import Query from 'devextreme/data/query';
import {salesmanData} from './salesData.js';

function getSalesById(id) {
  return Query(salesmanData).filter(['name', id]).toArray()[0];
}


export default function SalesTemplate(model) {
  const { appointmentData } = model.data;
  const salesIDData = getSalesById(appointmentData.salesman) || {};
  return (
    <div>
      <div>Job info: {appointmentData.text}</div>
      <div>
        Salesman: <strong>{ salesIDData.salesman }</strong>
      </div>
      <div>
        Address: {appointmentData.billingAddress}
      </div>
    </div>
  );
}