import { findProps } from 'devextreme-react/core/template';
import React from 'react';
import Text from 'react';
import Image from 'react';


class QuoteEmailTemplate extends React.Component{
    constructor(props){
    super(props);

    console.log(this.props.info);

    }
    render(){
        return(
            
                    <div>
                      <img src="C:\Users\amill\OneDrive\Pictures\information radiator.png"/>
                      {this.props.info.firstName}
                    </div>
               
        );
    }
}

export default QuoteEmailTemplate;