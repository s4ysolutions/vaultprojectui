import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from 'material-ui/TextField';

export const renderMuiTextField = ({ label, helperText, placeholder, input, meta, ...props }) => 
  <TextField
    label={label}
    placeholder={placeholder}
    helperText={helperText}
    disabled = {meta.submitting}
    inputProps={input}
    {...props}
  />;

renderMuiTextField.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};
