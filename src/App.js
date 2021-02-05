import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import HomeCalendar from './components/HomeCalendar';
import FoamCalendar from './components/FoamCalendar';
import FillCalendar from './components/FillCalendar';
import SalesCalendar from './components/SalesCalendar';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
        <SalesCalendar />
       </div> 
       <div>
        <FillCalendar />
       </div> 
        <div>
         <FoamCalendar />
       </div>  
      </div>
    );
  }
}


export default App;