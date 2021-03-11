import React from 'react'
import Homepage from './component/admin'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import { getUser } from './util/storage'

function App() {
  if (getUser()) return <Redirect to="/login" />
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  )
}

export default App
