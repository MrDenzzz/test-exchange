import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import storeConfigurator from './store';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={storeConfigurator()}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
