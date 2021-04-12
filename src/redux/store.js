import { createStore, combineReducers } from 'redux'

import QuoteOneReducer from './reducers/quoteOneReducer'
const reducers = {
    quoteOneReducer: QuoteOneReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

export default store
