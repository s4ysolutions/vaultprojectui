import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const _NotFound = ({ isQuerying })=><div>404 - {isQuerying}</div>;
_NotFound.propTypes = {
  isQuerying: PropTypes.bool
};
export default connect(state=>({ isQuerying: state.transient.isQuerying }))(_NotFound);
