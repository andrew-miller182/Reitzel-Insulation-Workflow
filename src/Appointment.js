import React from 'react';
import Query from 'devextreme/data/query';


import { salesmanData, data } from './data.js';

function getSalesById(id) {
  return Query(salesmanData).filter(['id', id]).toArray()[0];
}

export default function Appointment(model) {
  const { appointmentData } = model.data;
  const salesData = getSalesById(appointmentData.id) || {};
  return (
    <div>
      <div>Job info: {appointmentData.text}</div>
      <div>
        Salesman: <strong>{ salesData.name }</strong>
      </div>
    </div>
  );
}
