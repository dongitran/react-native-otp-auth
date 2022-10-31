import isNil from 'lodash/isNil.js';

export const isPhoneNumber = (str) => {
  if (isNil(str) || str[0] !== '0' || str.length !== 10 || !isNumericString(str)) {
    return false;
  }
  return true;
};

export const isNumericString = (str) => {
  if (typeof str !== 'string') {
    return false;
  } // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};
