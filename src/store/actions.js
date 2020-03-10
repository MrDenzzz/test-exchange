import {
    SET_CURRENCIES,
    SET_SEND_CURRENCY,
    SET_SEND_COUNT,
    SET_RECEIVE_CURRENCY,
    SET_RECEIVE_COUNT,
    SET_MIN_COUNT
} from './types';

export const setCurrencies = (payload) => {
    return {
        type: SET_CURRENCIES,
        payload
    };
};

export const setSendCurrency = (payload) => {
    return {
        type: SET_SEND_CURRENCY,
        payload
    };
};

export const setSendCount = (payload) => {
    return {
        type: SET_SEND_COUNT,
        payload
    };
};

export const setReceiveCurrency = (payload) => {
    return {
        type: SET_RECEIVE_CURRENCY,
        payload
    };
};

export const setReceiveCount = (payload) => {
    return {
        type: SET_RECEIVE_COUNT,
        payload
    };
};

export const setMinCount = (payload) => {
    return {
        type: SET_MIN_COUNT,
        payload
    };
};
