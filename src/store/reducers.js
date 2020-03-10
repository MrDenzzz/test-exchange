import {
    SET_CURRENCIES,
    SET_SEND_CURRENCY,
    SET_SEND_COUNT,
    SET_RECEIVE_CURRENCY,
    SET_RECEIVE_COUNT,
    SET_MIN_COUNT
} from './types';

export default (state, action) => {
    switch (action.type) {
        case SET_CURRENCIES:
            return {
                ...state,
                currencies: action.payload
            };
        case SET_SEND_CURRENCY:
            return {
                ...state,
                sendCurrency: action.payload
            };
        case SET_SEND_COUNT:
            return {
                ...state,
                sendCount: action.payload
            };
        case SET_RECEIVE_CURRENCY:
            return {
                ...state,
                receiveCurrency: action.payload
            };
        case SET_RECEIVE_COUNT:
            return {
                ...state,
                receiveCount: action.payload
            };
        case SET_MIN_COUNT:
            return {
                ...state,
                min: action.payload
            };
        default:
            return state;
    }
};
