import React from 'react';
// import { PropTypes } from 'prop-types';
import Typography from 'material-ui/Typography';
import { observer, inject } from 'mobx-react';

const Errors = inject('mobx')(observer(({ mobx: { errors } }) =>
  <div>
    {errors && errors.map((error, i) =>
      // eslint-disable-next-line react/no-array-index-key
      <Typography key={i} color="accent">
        {error}
      </Typography>)}
  </div>));

export default Errors;
