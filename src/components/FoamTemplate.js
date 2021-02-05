import React from 'react';
import Query from 'devextreme/data/query';
import {foamData} from '../foamData.js';

function getFoamById(id) {
  return Query(foamData).filter(['id', id]).toArray()[0];
}



export default function FoamTemplate(model) {
  const { appointmentData } = model.data;
  const foamIDData = getFoamById(appointmentData.id) || {};
  return (
    <div>
      <div>Job info: {appointmentData.text}</div>
      <div>
        Truck: <strong>{ foamIDData.name }</strong>
      </div>
      <div>
        Address: {appointmentData.address}
      </div>
    </div>
  );
}