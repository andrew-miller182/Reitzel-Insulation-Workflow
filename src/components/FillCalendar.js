import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import Scheduler, {Resource} from 'devextreme-react/scheduler';
import FillTemplate from './FillTemplate.js'

import { data, loosefillData} from '../fillData.js';

const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
const views = ['day','week', 'workWeek','month'];


class FillCalendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="workWeek"
        defaultCurrentDate={date}
        height={800}
        startDayHour={6}
        appointmentComponent={FillTemplate}
        >
        <Resource
          dataSource={loosefillData}
          fieldExpr="id"
          useColorAsDefault={true}
          >
        </Resource>
        </Scheduler>
    );
  }
}


export default FillCalendar;