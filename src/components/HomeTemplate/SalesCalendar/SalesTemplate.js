import React from 'react';
import Query from 'devextreme/data/query';
import {salesmanData} from './salesData.js';



export default function SalesTemplate(model) {
  const { appointmentData } = model.data;
  return (
    <div>
      <div>
        Job info: {appointmentData.EstimateInfo}</div>
    </div>
  );
}