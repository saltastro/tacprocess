import React from 'react';
import ReactDOM from 'react-dom';
import 'react-select/dist/react-select.min.css';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from './App';
import "./styles/index.css";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from "./rootReducer";
import TotalTimeDistribution from "./components/plots/TotalTimeDistribution";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const proposals = [{
    transparency: 'Clear',
    maxSeeing: 2,
    timeRequests: [
        {
            semester: '2017-1',
            distribution: [
                {
                    partnerCode: 'RSA',
                    time: 150
                },
                {
                    partnerCode: 'UW',
                    time: 200
                },
            ]
        },
        {
            semester: '2017-2',
            distribution: [
                {
                    partnerCode: 'RSA',
                    time: 400
                },
                {
                    partnerCode: 'UW',
                    time: 50
                },
            ]
        }
    ]
}];
const semester = '2017-1';
const partner = 'UW';

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        //<TotalTimeDistribution proposals={proposals} semester={semester} partner={partner}/>,
        document.getElementById('root'));

registerServiceWorker();
