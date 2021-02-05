import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import Scheduler, {Resource} from 'devextreme-react/scheduler';
import FoamTemplate from './FoamTemplate.js'

import { data, foamData} from '../foamData.js';

const currentDate = new Date();
let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
const views = ['day','week', 'workWeek','month'];


class FoamCalendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Scheduler
        width
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="workWeek"
        defaultCurrentDate={date}
        height={800}
        startDayHour={6}
        appointmentComponent={FoamTemplate}
        >
        <Resource
          dataSource={foamData}
          fieldExpr="id"
          useColorAsDefault={true}
          >
        </Resource>
        </Scheduler>
    );
  }
}


export default FoamCalendar;