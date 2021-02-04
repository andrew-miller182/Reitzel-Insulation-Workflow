import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import Scheduler, {Resource} from 'devextreme-react/scheduler';
import CalendarTemplate from './CalendarTemplate.js'

import { data, salesmanData, typeData, foamData, loosefillData } from '../data.js';
const groups = ['id'];

const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
const views = ['day','week', 'workWeek','month'];


class HomeCalendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Scheduler
        groups={groups}
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="workWeek"
        defaultCurrentDate={date}
        height={800}
        startDayHour={6}
        appointmentComponent={CalendarTemplate}
        >
        <Resource
          dataSource={salesmanData}
          fieldExpr="salesID"
          >
        </Resource>
        <Resource
          dataSource={typeData}
          fieldExpr="id"
          allowMultiple={false}
          useColorAsDefault = {true}
          >
        </Resource>
        <Resource
          dataSource={foamData}
          fieldExpr="foamID"
          >
        </Resource>
        <Resource
          dataSource={loosefillData}
          fieldExpr="fillID"
          >
        </Resource>
        </Scheduler>
    );
  }
}


export default HomeCalendar;