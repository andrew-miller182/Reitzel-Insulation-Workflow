import React, { setState, useState, useEffect } from "react";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Switch from 'devextreme-react/switch';
import Scheduler, {Resource} from 'devextreme-react/scheduler';
import SalesTemplate from './SalesTemplate.js'
import SalesTooltip from './salesTooltip.js';
import { regionColor} from './salesData';
import {getEstimates, deleteEstimate, getUsers, updateEstimate} from '../../../api/calendar';
import CustomStore from 'devextreme/data/custom_store';

const dataSource = new CustomStore({
  key: "EstimateID",
  load: async () => {
    const data = await getEstimates();
    console.log(data.data);
    return data.data
  },
  update: async (key, values) => {
    console.log(values);
    const check = await updateEstimate(key, values);
    return check;
  },
  remove: async(key) => {
    console.log(`removed ${key}`);
    const data = await deleteEstimate(key);
    return data
  }
});

const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
const views = ['day','week', 'workWeek','month'];
const groups = ['UserID'];

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
      userList:[{},{}]
    };
    
    this.onGroupByDateChanged = this.onGroupByDateChanged.bind(this);
    this.onAppointmentForm = this.onAppointmentForm.bind(this);
    this.salesmanSource = this.salesmanSource.bind(this);
  }
  
  
  onAppointmentForm(args) {
    args.cancel = true;
  }
  onGroupByDateChanged(args) {
    this.setState({
      groupByDate: args.value
    });
  }
  async salesmanSource() {
    console.log("did mount");
    const data = await getUsers();
    return data.data;
  }
  componentDidMount(){
    this.salesmanSource().then(result=>
      this.setState({userList:result}
    ));
  }
  
  render() {
    return (
      <div>
      <Scheduler
        timeZone="America/Toronto"
        groups = {groups}
        groupByDate={this.state.groupByDate}
        dataSource={dataSource}
        views={views}
        defaultCurrentView="workWeek"
        defaultCurrentDate={date}
        height={800}
        startDayHour={6}
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
          dataSource={regionColor}
          fieldExpr="region"
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


export default SalesCalendar;