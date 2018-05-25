import React from 'react'
import ReactDOM from 'react-dom'
import 'react-select/dist/react-select.min.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import './styles/index.css'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './rootReducer'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root'))

registerServiceWorker()
