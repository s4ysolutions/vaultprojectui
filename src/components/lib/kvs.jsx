import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import BackspaceIcon from 'material-ui-icons/Backspace';
import EditIcon from 'material-ui-icons/Edit';
import LabelIcon from 'material-ui-icons/Label';
import { Field, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import { renderMuiTextField } from './mui';
import {
  kvStartAddAt,
  kvStartEditOf,
  kvDeleteOf,
  kvCancelAdd,
  kvCompleteEdit
} from '../../actions';

// [[[ Row
const styles = () => ({
  icon: {
    display: 'flex',
    'align-items': 'center'
  }
});

const _Row = ({
  children,
  icon,
  handleStartAddAt,
  handleStartEditOf,
  handleDeleteOf,
  classes
}) =>
  <Grid container>
    <Grid className={classes.icon} item xs={1}>
      {icon}
    </Grid>
    <Grid item xs={7}>
      {children}
    </Grid>
    <Grid className={classes.icon} item xs={1}>
      <Button disabled={!handleStartAddAt} onClick={handleStartAddAt}>
        <AddCircleIcon />
      </Button>
    </Grid>
    <Grid className={classes.icon} item xs={1}>
      <Button disabled={!handleStartEditOf} onClick={handleStartEditOf}>
        <EditIcon />
      </Button>
    </Grid>
    <Grid className={classes.icon} item xs={1}>
      <Button disabled={!handleDeleteOf} onClick={handleDeleteOf}>
        <BackspaceIcon />
      </Button>
    </Grid>
    <Grid item xs={1} />
  </Grid>;
_Row.propTypes = {
  children: PropTypes.any.isRequired,
  icon: PropTypes.element.isRequired,
  handleStartAddAt: PropTypes.func, // Optional if a form already open
  handleStartEditOf: PropTypes.func, // Optional if a form already open
  handleDeleteOf: PropTypes.func.isRequired,
  classes: PropTypes.any.isRequired
};

const Row = withStyles(styles)(_Row);
// ]]]
// [[[ RowKV
const RowKV = ({
  key,
  value,
  handleStartAddAt,
  handleStartEditOf,
  handleDeleteOf
}) =>
  <Row
    handleDeleteOf={handleDeleteOf}
    handleStartAddAt={handleStartAddAt}
    handleStartEditOf={handleStartEditOf}
    icon={LabelIcon}
  >
    <Typography>
      {key}: {value}
    </Typography>
  </Row>;
RowKV.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleStartAddAt: PropTypes.func.isRequired,
  handleStartEditOf: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func.isRequired
};
// ]]]
// [[[ KVForm
const _KVForm = ({ submitting, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <Field
      component={renderMuiTextField}
      disabled={submitting}
      label="Key"
      name="key"
    />
    <Field
      component={renderMuiTextField}
      disabled={submitting}
      label="Value"
      name="value"
    />
  </form>;
_KVForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const KVForm = reduxForm({
  form: 'kv_form',
  validate: (values) => {
    const errors = {};
    if (!values.key) {
      errors.key = 'Required';
    }
    if (!values.value) {
      errors.value = 'Required';
    }
    return errors;
  },
  onSubmit: (values, { handleCompleteEdit }) => handleCompleteEdit(values)
})(_KVForm);

/*
_KVForm.propTypes = {
  // InitialValues: PropTypes.object.isRequired,
  // HandleCompleteEdit: PropTypes.func.isRequired
};
*/
// ]]]]
// [[[ RowForm
const _RowForm = ({
  initialValues,
  handleCompleteEdit,
  handleDeleteOf,
  handleCancelAdd,
  submitForm
}) =>
  <Row
    handleCancelAdd={handleCancelAdd}
    handleDeleteOf={handleDeleteOf}
    handleStartAddAt={!initialValues.key && submitForm}
    handleStartEditOf={initialValues.key && submitForm}
    icon={LabelIcon}
  >
    <KVForm
      handleCompleteEdit={handleCompleteEdit}
      initialValues={initialValues}
    />
  </Row>;
_RowForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  handleCompleteEdit: PropTypes.func.isRequired,
  handleCancelAdd: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func // Optional for only add form
};

const RowForm = connect(
  () => ({}),
  (dispatch) => ({ submitForm: () => dispatch(submit('kv_form')) })
)(_RowForm);

// ]]]
const DEFAULT_CC = [];

const _KVs = ({
  kvs,
  addingAt,
  editingKey,
  factoryStartAddAt,
  factoryStartEditOf,
  factoryDeleteOf,
  handleCompleteEdit,
  handleCancelAdd
}) =>
  <Grid container>
    {kvs.length === 0
      ? addingAt !== false &&
          <RowForm handleCompleteEdit={handleCompleteEdit} key="" value="" />

      : Object.entries(kvs).reduce(
        (kv, cc) =>
          addingAt === cc.length // Adding KV
            ? cc.
                  concat(<RowKV
                    handleDeleteOf={factoryDeleteOf(kv[0])}
                    key={kv[0]}
                    value={kv[1]}
                  />). // Can't start edit/add
                  concat(<RowForm
                    handleCancelAdd={handleCancelAdd}
                    handleCompleteEdit={handleCompleteEdit}
                    key=""
                    value=""
                  />)
            : editingKey === kv[0]
              ? cc.concat(<RowForm // Edit KV
                handleCompleteEdit={handleCompleteEdit}
                handleDelete={factoryDeleteOf(kv[0])}
                key={kv[0]}
                value={kv[1]}
              />)
              : cc.concat(<RowKV // Show KV
                handleAdd={factoryStartAddAt(cc.lenght)}
                handleDelete={factoryDeleteOf(kv[0])}
                handleEdit={factoryStartEditOf(kv[0])}
                key={kv[0]}
                value={kv[1]}
              />),
        DEFAULT_CC
      )}
  </Grid>;
_KVs.propTypes = {
  kvs: PropTypes.array.isRequired,
  addingAt: PropTypes.func,
  editingKey: PropTypes.string,
  factoryStartAddAt: PropTypes.func.isRequired,
  factoryStartEditOf: PropTypes.func.isRequired,
  factoryDeleteOf: PropTypes.func.isRequired,
  handleCancelAdd: PropTypes.func.isRequired,
  handleCompleteEdit: PropTypes.func.isRequired
};

const KVs = connect(
  (state) => ({
    kvs: state.kvs.kvs,
    addingAt: state.kvs.addingAt,
    editingKey: state.kvs.editingKey
  }),
  (dispatch) => ({
    factoryStartAddAt: (pos) => () => dispatch(kvStartAddAt(pos)),
    factoryStartEditOf: (key) => () => dispatch(kvStartEditOf(key)),
    factoryDeleteOf: (key) => () => dispatch(kvDeleteOf(key)),
    handleCancelAdd: () => dispatch(kvCancelAdd()),
    handleCompleteEdit: () => dispatch(kvCompleteEdit())
  })
)(_KVs);

export default KVs;
