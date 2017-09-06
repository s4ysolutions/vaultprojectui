import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from 'material-ui/TextField';

const _ = o=>(console.log(o), o);

export const renderMuiTextField = ({ helperText, input, meta, ...props }) => 
  <TextField
    value={input.value}
    helperText={(meta.dirty || meta.submitFailed) && meta.error || helperText}
    disabled = {meta.submitting}
    inputProps={input}
    error={!!((meta.dirty || meta.submitFailed) && meta.error)}
    {...props}
  />;

renderMuiTextField.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
};
