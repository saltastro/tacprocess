import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react';
import { BrowserTracing } from "@sentry/tracing";

import 'react-select/dist/react-select.min.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import './styles/index.css'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './rootReducer'

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
console.log("Mode: ", process.env.NODE_ENV)
ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
export default store
