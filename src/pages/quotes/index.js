import React, {useState } from "react";
import { Route, Switch,  Link,  useParams,  useRouteMatch, useHistory } from "react-router-dom";
import FormOne from "./FormOne";
import QuoteOne from "./QuoteOne";
import QuotePrint from "./QuotePrint";

export default function Quotes() {

  const [quoteDataId, setQuoteDataId] = useState('1');
  const [quoteData, setQuoteData] = useState({});
  const [quoteFormData, setQuoteFormData] = useState({});

  let { path, url } = useRouteMatch();
  let history = useHistory();

  function onSetQuoteDataChange(data) {
    if (!(data == null || data  == "" || data == undefined)) {
        setQuoteDataId(data.id);
        setQuoteData(data);
        history.push(`${url}/${data.id}/new/`)

    }else{
        setQuoteData({});
    }
  }

  function onSetQuoteFormDataChange(data) {
    if (!(data == null || data  == "" || data == undefined)) {
        setQuoteFormData(data);
        console.log(data);
        history.push(`${url}/${quoteDataId}/print/`)
    }else{
        setQuoteFormData({});
    }
  }

  function onEditQuoteFormData(){
      history.push(`/quotes/${quoteData.id}/edit/`)
  }

  return (
    <div style={{padding: "10px", margin: "10px"}}>
      <div>
        <h2> Quote Form  <Link className="btn btn-sm float-right" style={{float: "right"}} to="/quotes"><button> New Quote  </button></Link></h2>
      </div> 
      <hr/>
      <Switch>
        <Route exact path={path} >
          <FormOne quoteDataId={quoteDataId} onSetQuoteDataChange={onSetQuoteDataChange} />
          </Route>
        <Route path={`/quotes/${quoteDataId}/new`} >
          <QuoteOne key={quoteData} quoteData={quoteData} onSetQuoteFormDataChange={onSetQuoteFormDataChange} />
        </Route>
        <Route path={`/quotes/${quoteDataId}/edit`} >
          <QuoteOne key={quoteData} quoteData={quoteData} quoteFormData={quoteFormData} onSetQuoteFormDataChange={onSetQuoteFormDataChange} />
        </Route>
        <Route path={`/quotes/${quoteDataId}/print`} >
          <QuotePrint key={quoteData} quoteFormData={quoteFormData}  quoteData={quoteData} onEditQuoteFormData={onEditQuoteFormData} />
        </Route>
      </Switch>
      
    </div>
  )
}
