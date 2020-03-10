import { createStore } from 'redux';
import reducers from './reducers';

const state = {
    currencies: [],
    sendCurrency: null,
    sendCount: 0,
    receiveCurrency: null,
    receiveCount: 0,
    min: 0
};

export default () => {
    return createStore(reducers, state);
};
