import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import QuoteOneReducer from './reducers/quoteOneReducer'
const reducers = {
    // ... your other reducers here ...
    form: formReducer,
    quoteOneReducer: QuoteOneReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

export default store
