import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import {
  TextField,
  InputAdornment,
  CircularProgress
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  setSendCurrency,
  setReceiveCurrency,
  setSendCount
} from '../store/actions';

const useStyles = makeStyles(theme => ({
  underline: {
    '& .MuiInput-underline': {
      '&:before': {
        borderBottom: 'none'
      },
      '&:after': {
        borderBottom: 'none'
      }
    }
  },
  wrapper: {
    position: 'relative',
  },
  inputProgress: {
    color: '#007a80',
    position: 'absolute',
    top: '50%',
    right: '0%',
    marginTop: -22,
    marginLeft: -12,
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator={false}
      decimalSeparator="."
      fixedDecimalScale={true}
      isNumericString
      allowNegative={false}
      allowLeadingZeros={true}
      type="text"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function AutocompleteInput({
  min,
  type,
  sendCount,
  sendCurrency,
  receiveCount,
  receiveCurrency,
  loading,
  currencies,
  getMin,
  getEstimated,
  setSendCount,
  setSendCurrency,
  setReceiveCurrency
}) {
  const classes = useStyles();

  const handleChange = event => {
    if (type === 'send') {
      setSendCount(event.target.value);
      getEstimated(sendCurrency.symbol, receiveCurrency.symbol, event.target.value);
    }
  };

  return (
    <div className={classes.wrapper}>
      <TextField
        id={`input-${type}`}
        fullWidth
        type="number"
        value={type === 'send' ? sendCount : receiveCount}
        onChange={handleChange}
        inputProps={{ readOnly: type === 'receive' }}
        error={
          (type === 'receive' && +min > +sendCount)
            || (type === 'send' && (min === null || receiveCount === null))
        }
        helperText={
          type === 'send' && (min === null || receiveCount === null) ? 'This pair is disabled now'
            : type === 'receive' && +min > +sendCount ? `The minimum amount: ${min}` : ' '
        }
        InputProps={{
          inputComponent: NumberFormatCustom,
          startAdornment: (
            <InputAdornment position="start">
              <Autocomplete
                id={`select-${type}`}
                options={currencies}
                value={type === 'send' ? sendCurrency : receiveCurrency}
                getOptionLabel={option => `(${option.symbol.toUpperCase()}) ${option.name}`}
                getOptionDisabled={
                  option => option.symbol === receiveCurrency.symbol
                    || option.symbol === sendCurrency.symbol
                }
                onChange={(event, newValue) => {
                  if (type === 'send') {
                    setSendCurrency(newValue);
                    getMin(newValue.symbol, receiveCurrency.symbol);
                  }
                  if (type === 'receive') {
                    setReceiveCurrency(newValue);
                    getMin(sendCurrency.symbol, newValue.symbol);
                  }
                }}
                style={{ width: 250 }}
                disableClearable={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    className={classes.underline}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password'
                    }}
                  />
                )}
              />
            </InputAdornment>
          )
        }}
      />
      {loading && <CircularProgress size={24} className={classes.inputProgress} />}
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setSendCurrency: (payload) => dispatch(setSendCurrency(payload)),
  setReceiveCurrency: (payload) => dispatch(setReceiveCurrency(payload)),
  setSendCount: (payload) => dispatch(setSendCount(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteInput);
