import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {
  createMuiTheme,
  CssBaseline,
  Container,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import AutocompleteInput from './components/AutocompleteInput';

import {
  setCurrencies,
  setSendCurrency,
  setReceiveCurrency,
  setSendCount,
  setReceiveCount,
  setMinCount
} from './store/actions';

const axios = require('axios');

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2)
  },
}));

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = apiKey ? process.env.REACT_APP_API_URL || 'https://api.simpleswap.io/v1'
  : 'https://api.simpleswap.io';

function App({
  min,
  sendCount,
  sendCurrency,
  receiveCount,
  receiveCurrency,
  setCurrencies,
  setSendCurrency,
  setSendCount,
  setReceiveCurrency,
  setReceiveCount,
  setMinCount
}) {
  const classes = useStyles();
  const [initialized, setInitialized] = useState(false);
  const [curLoading, setCurLoading] = useState(false);
  const [receiveLoading, setReceiveLoading] = useState(false);

  const getEstimated = (currency_from, currency_to, amount) => {
    setReceiveCount('-');
    setReceiveLoading(true);
    axios.get(`${apiUrl}/get_estimated`, {
      params: {
        api_key: apiKey,
        currency_from,
        currency_to,
        amount
      }
    }).then(({ data }) => {
      setReceiveCount(data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setReceiveLoading(false);
    });
  };

  const getMin = (currency_from, currency_to) => {
    setCurLoading(true);
    setReceiveCount('-');
    axios.get(`${apiUrl}/${apiKey ? 'get_ranges' : 'get_min'}`, {
      params: {
        api_key: apiKey,
        currency_from,
        currency_to
      }
    }).then(({ data }) => {
      const result = apiKey ? data.min : data;
      setSendCount(result);
      setMinCount(result);
      getEstimated(currency_from, currency_to, result);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setCurLoading(false);
    });
  };

  const getCurrencies = () => {
    setInitialized(true);
    setCurLoading(true);
    axios.get(`${apiUrl}/get_all_currencies`, {
      params: {
        api_key: apiKey
      }
    }).then(({ data }) => {
      setCurrencies(data);
      setSendCurrency(data.find(item => item.symbol === 'btc'));
      setReceiveCurrency(data.find(item => item.symbol === 'eth'));
      getMin('btc', 'eth');
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setCurLoading(false);
    });
  };

  useEffect(() => {
    if (!initialized) {
      getCurrencies();
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container component="main" className={classes.container}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h6">
                I want to send
              </Typography>
              <AutocompleteInput
                type="send"
                loading={curLoading}
                getMin={getMin}
                getEstimated={getEstimated}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="h6">
                I will receive
              </Typography>
              <AutocompleteInput
                type="receive"
                loading={curLoading || receiveLoading}
                getMin={getMin}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setCurrencies: (payload) => dispatch(setCurrencies(payload)),
  setSendCurrency: (payload) => dispatch(setSendCurrency(payload)),
  setReceiveCurrency: (payload) => dispatch(setReceiveCurrency(payload)),
  setSendCount: (payload) => dispatch(setSendCount(payload)),
  setReceiveCount: (payload) => dispatch(setReceiveCount(payload)),
  setMinCount: (payload) => dispatch(setMinCount(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
