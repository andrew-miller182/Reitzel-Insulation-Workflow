import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import HomeCalendar from './components/HomeCalendar'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HomeCalendar />
    );
  }
}


export default App;