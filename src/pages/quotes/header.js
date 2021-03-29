import React, {Component} from 'react';
import logo from '../../assets/logo.png';


class Header extends React.Component {


    render(){
        return(
        <div >
            <img src ={logo} width='400' height='100px'></img>
            <div style={{float:'right', size:'80%'}}>
              <p>134 Northfield Drive East</p>
            <p>Waterloo, Ontario</p>
            <p>N2J 4G8</p>
            <p>519 886 6100</p>
		    <p>www.reitzel.ca</p>
		    <p>1-800-265-8869</p>   
            </div>
           

        </div>
        )
    }
}

export default Header;