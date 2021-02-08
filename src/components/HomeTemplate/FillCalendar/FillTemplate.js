import React from 'react';
import Query from 'devextreme/data/query';
import {loosefillData} from './fillData.js';

function getFillById(id) {
  return Query(loosefillData).filter(['id', id]).toArray()[0];
}



export default function FillTemplate(model) {
  const { appointmentData } = model.data;
  const fillIDData = getFillById(appointmentData.id) || {};
  return (
    <div>
      <div>Job info: {appointmentData.text}</div>
      <div>
        Truck: <strong>{ fillIDData.name }</strong>
      </div>
      <div>
        Address: {appointmentData.address}
      </div>
    </div>
  );
}