import React, { setState, useState, useEffect } from "react";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Switch from 'devextreme-react/switch';
import Scheduler, {Resource} from 'devextreme-react/scheduler';
import SalesTemplate from './SalesTemplate.js'
import SalesTooltip from './salesTooltip.js';
import {getEstimates, deleteEstimate, getUsers, updateEstimate, getRegionAPI} from '../../../api/calendar';
import CustomStore from 'devextreme/data/custom_store';
import {formatDate, addHours} from 'date-fns'


const { zonedTimeToUtc, utcToZonedTime, format } = require('date-fns-tz')

const dataSource = new CustomStore({
  key: "EstimateID",
  load: async () => {
    const data = await getEstimates();
    let formatData = data.data.map((item) => ({
      EstimateID : item.EstimateID,
      CustomerID : item.CustomerID,
      AddressID : item.AddressID,
      UserID : item.UserID,
      JobType : item.JobType,
      CreationDate : item.CreationDate,
      EstimateInfo : item.EstimateInfo,
      startDate : timeFormat(item.startDate),
      endDate : timeFormat(item.endDate)
    }));
    console.log(formatData);
    return formatData
  },
  update: async (key, values) => {
    let formatData = {
      EstimateID : values.EstimateID,
      CustomerID : values.CustomerID,
      AddressID : values.AddressID,
      UserID : values.UserID,
      JobType : values.JobType,
      CreationDate : values.CreationDate,
      EstimateInfo : values.EstimateInfo,
      startDate : timeDeformat(values.startDate),
      endDate : timeDeformat(values.endDate)
  }
    const check = await updateEstimate(key, formatData);
    console.log(check);
    return check;
  },
  remove: async(key) => {
    console.log(`removed ${key}`);
    const data = await deleteEstimate(key);
    return data
  },
  insert: async (key, values) =>{
    console.log("attempted insert");
  }
});

const timeFormat = (date) => {
   let newdate = zonedTimeToUtc(new Date(date), 'America/Edmonton');
   var formatteddate = format(newdate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
   return formatteddate;
}

const timeDeformat = (date) => {
  let newdate = utcToZonedTime(new Date(date), 'America/Edmonton');
  var formatteddate = format(newdate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
   return formatteddate;
}
const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
const views = ['day','week', 'workWeek','month'];
const groups = ['UserID'];
const renderResourceCell = (model) => {
  return (
      <i>{model.data.FirstName}</i>
  );
}


//const onAppointmentDeleting = (e) => {
//  window.confirm("Are you sure you wish to delete this appointment?") &&
//        this.dataSource.remove(e)
//}

class SalesCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      groupByDate:true,
      cancel:true,
      userList:"",
      regionList:"",
      info:false
    };
    
    this.onGroupByDateChanged = this.onGroupByDateChanged.bind(this);
    this.onAppointmentForm = this.onAppointmentForm.bind(this);
    this.salesmanSource = this.salesmanSource.bind(this);
    this.regionSource = this.regionSource.bind(this);
    this.InfoIsHere = this.InfoIsHere.bind(this);
  }
  async InfoIsHere() {
  let regionData = await this.regionSource();
  let userData = await this.salesmanSource();
  this.setState({userList:userData});
  this.setState({regionList:regionData});
  this.setState({info:true});
} 
  
  onAppointmentForm(args) {
    args.cancel = true;
  }
  onGroupByDateChanged(args) {
    this.setState({
      groupByDate: args.value
    });
  }
  async regionSource() {
    const data = await getRegionAPI();
    console.log(data.data);
    return data.data;
  }

  async salesmanSource() {
    const data = await getUsers();
    console.log(data.data);
    return data.data;
  }
  componentDidMount(){
    this.InfoIsHere();
}
 


  render() {
    if (this.state.info == false){
        return (
          <p>Loading information...</p>
        )
      }
      else{

      
    return (
      
      <div>
      <Scheduler
        timeZone="America/Edmonton"
        //groups = {groups}
        groupByDate={this.state.groupByDate}
        resourceCellRender={renderResourceCell}
        dataSource={dataSource}
        views={views}
        defaultCurrentView="workWeek"
        defaultCurrentDate={date}
        height={800}
        startDayHour={0}
        endDayHour={24}
        appointmentComponent={SalesTemplate}
        //appointmentTooltipComponent={SalesTooltip}
        //onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentFormOpening={this.onAppointmentForm}
        >
        <Resource
          dataSource={this.state.userList}
          fieldExpr="UserID"
          >
        </Resource>
        <Resource
          dataSource={this.state.regionList}
          fieldExpr="RegionID"
          useColorAsDefault={true}
        ></Resource>
        </Scheduler>
        <div className="options">
        <div className="caption">Group by Date First</div>
        <div className="option">
          <Switch
            value={ this.state.groupByDate }
            onValueChanged={this.onGroupByDateChanged}
          />
        </div>
      </div>
    </div>
    );
  }
}
}

export default SalesCalendar;