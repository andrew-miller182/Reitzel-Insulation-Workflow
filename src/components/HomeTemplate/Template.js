import React, { Component } from 'react';
import Tabs from "./Tabs"; 
import SalesCalendar from './SalesCalendar/SalesCalendar';
import FoamCalendar from './FoamCalendar/FoamCalendar';
import FillCalendar from './FillCalendar/FillCalendar';
import './Template.css';

class Template extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        
        return(
      <div>
        <h1>Tabs Demo</h1>
       <Tabs> 
         <div label="Sales"> 
           <SalesCalendar />
         </div> 
         <div label="Foam"> 
           <FoamCalendar />
         </div> 
         <div label="Fill"> 
         <FillCalendar />
         </div> 
       </Tabs> 
      </div>
    );
  }
}
  export default Template;