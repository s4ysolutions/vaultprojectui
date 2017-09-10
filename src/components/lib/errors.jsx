import React from 'react';
import { PropTypes } from 'prop-types';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';

const _Errors = ({ errors }) => (
  <div>
    {errors.map((error, i) => (
      <Typography key={i} color="accent">
        {error}
      </Typography>
    ))}
  </div>
);

_Errors.propTypes = {
  errors: PropTypes.array.isRequired
};

const Errors = connect(state => ({
  errors: state.messages.errors
}))(_Errors);

export default Errors;
