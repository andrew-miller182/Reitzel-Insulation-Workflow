import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Switch from 'devextreme-react/switch';
import Scheduler, {Resource} from 'devextreme-react/scheduler';
import SalesTemplate from './SalesTemplate.js'
import SalesTooltip from './salesTooltip.js'

import { data, salesmanData, regionColor} from './salesData';

const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
const views = ['day','week', 'workWeek','month'];
const groups = ['id'];

const onAppointmentDeleting = (e) => {
  window.confirm("Are you sure you wish to delete this appointment?") &&
        this.deleteItem(e)
}

class SalesCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      groupByDate:true,
      cancel:true
    };
    this.onGroupByDateChanged = this.onGroupByDateChanged.bind(this);
    this.onAppointmentForm = this.onAppointmentForm.bind(this);
  }
  onAppointmentForm(args) {
    args.cancel = true;
  }
  onGroupByDateChanged(args) {
    this.setState({
      groupByDate: args.value
    });
  }
  render() {
    return (
      <div>
      <Scheduler
        groups = {groups}
        groupByDate={this.state.groupByDate}
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="workWeek"
        defaultCurrentDate={date}
        height={800}
        startDayHour={6}
        //appointmentComponent={SalesTemplate}
        appointmentTooltipComponent={SalesTooltip}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentFormOpening={this.onAppointmentForm}
        >
        <Resource
          dataSource={salesmanData}
          fieldExpr="id"
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