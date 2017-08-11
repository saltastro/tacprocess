import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './app';
import { semesterData as semesterDataReducer } from './reducers';

import './semantic-dist/semantic.css';
import './styles/index.css'

const rootReducer = (state={}, action) => {
    return {
        semesterData: semesterDataReducer(state.semesterData, action)
    };
};

const store = createStore(rootReducer,
                          composeWithDevTools(applyMiddleware(thunk)));

render(<Provider store={store}>
    <Router>
            <App/>
    </Router>
        </Provider>,
        document.getElementById('root'));
registerServiceWorker();
