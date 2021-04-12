import { findProps } from 'devextreme-react/core/template';
import React from 'react';
import QuoteEmailTemplate from './quote_template';


class QuoteTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showEmail:false,
            customer:{
                firstName:"Andrew",
                lastName:"Miller",
                address:"453",
                city:"calgary",
                postalCode:"code"
            },
            siteAddress:{

            },
            quoteinfo:{

            }


    }
        this.getCustomerInfo = this.getCustomerInfo.bind(this);
        this.displayCustomerInfo = this.displayCustomerInfo.bind(this);
        this.turnToEmail = this.turnToEmail.bind(this);
        this.handleChange = this.handleChangeCustomer.bind(this);

    }
    getCustomerInfo(){
        return this.state.customer;
    }
    displayCustomerInfo(){
        console.log(this.state.customer)
    }
     turnToEmail(){
        
        this.setState({showEmail:true})
    }
     handleChangeCustomer(event){
        const { target: { name, value } } = event
         this.setState(prevState => ({customer:{ ...prevState.customer,[name]:value}}))
     }
    render(){
        return(
            <div id='template'>
            
                    <div>
                        First Name:<input id='firstName' name="firstName" type='text' value={this.state.customer.firstName} onChange={e =>{this.handleChangeCustomer(e)}} />
                        Last Name:<input id='lastName' name="lastName" type='text' value={this.state.customer.lastName} onChange={e =>{this.handleChangeCustomer(e)}} />
                        Address:<input id='address' name="address" type='text' value={this.state.customer.address} onChange={e =>{this.handleChangeCustomer(e)}} />
                        City:<input id='city' name="city" type='text' value={this.state.customer.city} onChange={e =>{this.handleChangeCustomer(e)}} />
                        Postal Code:<input id='postalCode' name="postalCode" type='text' value={this.state.customer.postalCode} onChange={e =>{this.handleChangeCustomer(e)}} />
                    </div>
                <div>
                    <button onClick={this.turnToEmail}>Click Me </button> 
                    {this.state.showEmail ? <QuoteEmailTemplate info = {this.state.customer} /> : null}
                </div>
            </div>
        );
    }
}

export default QuoteTemplate;