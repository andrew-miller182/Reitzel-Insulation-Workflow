import React from 'react';
import Query from 'devextreme/data/query';


import { salesmanData, foamData, loosefillData } from '../data.js';

function getSalesById(id) {
  return Query(salesmanData).filter(['salesID', id]).toArray()[0];
}
function getFoamById(id) {
  return Query(foamData).filter(['foamID', id]).toArray()[0];
}
function getFillById(id) {
  return Query(loosefillData).filter(['fillID', id]).toArray()[0];
}


export default function CalendarTemplate(model) {
  const { appointmentData } = model.data;
  if(appointmentData.id === 1){
  const salesData = getSalesById(appointmentData.salesID) || {};
  return (
    <div>
      <div>Job info: {appointmentData.text}</div>
      <div>
        Salesman: <strong>{ salesData.name }</strong>
      </div>
      <div>
        Address: {appointmentData.address}
      </div>
    </div>
  );
}
if(appointmentData.id === 2){
  const foamIDData = getFoamById(appointmentData.foamID) || {};
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
if(appointmentData.id === 3){
  const looseIDData = getFillById(appointmentData.fillID) || {};
  return (
    <div>
      <div>Job info: {appointmentData.text}</div>
      <div>
        Truck: <strong>{ looseIDData.name }</strong>
      </div>
      <div>
        Address: {appointmentData.address}
      </div>
    </div>
  );
}
}
