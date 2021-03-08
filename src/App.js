import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Template from './components/HomeTemplate/Template';
import QuoteTemplate from './components/Email_Templates/test_quote';
import QuoteEmailTemplate from './components/Email_Templates/quote_template';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Template />
      </div>
    );
  }
}


export default App;