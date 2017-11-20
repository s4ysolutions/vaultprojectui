import React from 'react';
import PropTypes from 'prop-types';
import u from 'update-immutable';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import BackspaceIcon from 'material-ui-icons/Backspace';
import EditIcon from 'material-ui-icons/Edit';
import LabelIcon from 'material-ui-icons/Label';
import { Field, reduxForm, submit } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { renderMuiTextField } from './mui';
import { kvStartAddAt, kvStartEditOf } from '../../actions';
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

// [[[ Row
const styles = theme => ({
  icon: {
    display: 'flex',
    'align-items': 'center'
  },
  content: {
    display: 'flex',
    'align-items': 'center'
  },
  button: { margin: theme.spacing.unit }
});

const _Row = ({
  children,
  icon,
  handleStartAddAt,
  handleStartEditOf,
  handleDeleteOf,
  classes,
  primaryAdd,
  primaryEdit
}) =>
  <Grid container>
    <Grid className={classes.icon} item>
      {icon}
    </Grid>
    <Grid className={classes.content} item xs>
      {children}
    </Grid>
    <IconButton
      aria-label="Add"
      className={classes.button}
      color={primaryAdd && 'primary' || 'default'}
      disabled={!handleStartAddAt}
      onClick={handleStartAddAt}
    >
      <AddCircleIcon />
    </IconButton>
    <IconButton
      aria-label="Modify"
      className={classes.button}
      color={primaryEdit && 'primary' || 'default'}
      disabled={!handleStartEditOf}
      onClick={handleStartEditOf}
    >
      <EditIcon />
    </IconButton>
    <IconButton
      aria-label="Delete"
      className={classes.button}
      disabled={!handleDeleteOf}
      onClick={handleDeleteOf}
    >
      <BackspaceIcon />
    </IconButton>
  </Grid>
;
_Row.propTypes = {
  children: PropTypes.any.isRequired,
  icon: PropTypes.element.isRequired,
  handleStartAddAt: PropTypes.func, // Optional if a form already open
  handleStartEditOf: PropTypes.func, // Optional if a form already open
  handleDeleteOf: PropTypes.func,
  classes: PropTypes.any.isRequired,
  primaryAdd: PropTypes.bool.isRequired,
  primaryEdit: PropTypes.bool.isRequired
};

const Row = withStyles(styles)(_Row);
// ]]]
// [[[ RowKV
const RowKV = ({
  k,
  v,
  handleStartAddAt,
  handleStartEditOf,
  handleDeleteOf
}) =>
  <Row
    handleDeleteOf={handleDeleteOf}
    handleStartAddAt={handleStartAddAt}
    handleStartEditOf={handleStartEditOf}
    icon={<LabelIcon />}
    primaryAdd={false}
    primaryEdit={false}
  >
    <Typography>
      {k}: {v}
    </Typography>
  </Row>
;
RowKV.propTypes = {
  k: PropTypes.string.isRequired,
  v: PropTypes.any,
  handleStartAddAt: PropTypes.func,
  handleStartEditOf: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func.isRequired
};
// ]]]
// [[[ KVForm
const _KVForm = ({ submitting, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <Field
      required
      component={renderMuiTextField}
      disabled={submitting}
      label="Key"
      name="k"
    />
    &nbsp;
    <Field
      component={renderMuiTextField}
      disabled={submitting}
      label="Value"
      name="v"
    />
  </form>
;
_KVForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const KVForm = reduxForm({
  form: 'kv_form',
  validate: values => {
    const errors = {};
    if (!values.k) {
      errors.k = 'Required';
    }
    return errors;
  },
  onSubmit: (values, dispatch, { handleCompleteEdit }) =>
    handleCompleteEdit(values)
})(_KVForm);

KVForm.propTypes = { handleCompleteEdit: PropTypes.func.isRequired };

// ]]]]
// [[[ RowForm
const _RowForm = ({
  initialValues,
  handleCompleteEdit,
  handleDeleteOf,
  submitForm,
  primaryAdd,
  primaryEdit
}) =>
  <Row
    handleDeleteOf={handleDeleteOf}
    handleStartAddAt={!initialValues.k && submitForm || undefined}
    handleStartEditOf={initialValues.k && submitForm || undefined}
    icon={<LabelIcon />}
    primaryAdd={primaryAdd}
    primaryEdit={primaryEdit}
  >
    <KVForm
      handleCompleteEdit={handleCompleteEdit}
      initialValues={initialValues}
    />
  </Row>
;
_RowForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  primaryEdit: PropTypes.bool.isRequired,
  primaryAdd: PropTypes.bool.isRequired,
  handleCompleteEdit: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func // Optional for only add form
};

const RowForm = connect(
  (state, { k, v }) => ({
    initialValues: {
      k,
      v
    }
  }),
  dispatch => ({ submitForm: () => dispatch(submit('kv_form')) })
)(_RowForm);

// ]]]
const DEFAULT_CC = [];

const _KVs = ({
  kvs,
  addingAt,
  editingOf,
  factoryStartAddAt,
  factoryStartEditOf,
  factoryDeleteOf,
  cancelAdd,
  cancelEdit,
  handleCompleteEdit
}) =>
  <Grid container>
    {kvs.length === 0
      ? addingAt !== false &&
          <RowForm
            primaryAdd
            primaryEdit={false}
            k=""
            v=""
            handleCompleteEdit={handleCompleteEdit}
          />

      : kvs.reduce(
        (cc, kv) =>
          addingAt === cc.length // Adding KV
            ? cc
                  .concat(<RowKV
                    handleStartEditOf={factoryStartEditOf(kv[0])}
                    handleDeleteOf={factoryDeleteOf(kv[0])}
                    k={kv[0]}
                    key={`kv${cc.lenght}`}
                    primaryAdd={false}
                    primaryEdit={false}
                    v={kv[1]}
                  />) // Can't start edit/add
                  .concat(<RowForm
                    k=""
                    key={`kv${cc.lenght}${1}`}
                    primaryAdd
                    primaryEdit={false}
                    v=""
                    handleCompleteEdit={handleCompleteEdit}
                    handleDeleteOf={
                      addingAt < kvs.lenght ? cancelAdd : undefined
                    }
                  />)
            : editingOf === kv[0]
              ? cc.concat(<RowForm // Edit KV
                handleCompleteEdit={handleCompleteEdit}
                handleDelete={factoryEdit}
                k={kv[0]}
                key={`kv${cc.lenght}`}
                primaryAdd={false}
                primaryEdit
                v={kv[1]}
              />)
              : cc.concat(<RowKV // Show KV
                handleDeleteOf={factoryDeleteOf(kv[0])}
                handleStartAddAt={factoryStartAddAt(cc.lenght)}
                handleStartEditOf={factoryStartEditOf(kv[0])}
                k={kv[0]}
                key={`kv${cc.length}`}
                v={kv[1]}
              />),
        DEFAULT_CC
      )}
  </Grid>
;
_KVs.propTypes = {
  kvs: PropTypes.array.isRequired,
  addingAt: PropTypes.any.isRequired,
  editingOf: PropTypes.any.isRequired,
  cancelAdd: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  factoryStartAddAt: PropTypes.func.isRequired,
  factoryStartEditOf: PropTypes.func.isRequired,
  factoryDeleteOf: PropTypes.func.isRequired,
  handleCompleteEdit: PropTypes.func.isRequired
};

const KVs = compose(
  withRouter,
  connect(state => ({
    kvsObj: state.kvsEditor.kvs,
    kvs: Object.entries(state.kvsEditor.kvs),
    addingAt: state.kvsEditor.addingAt,
    editingOf: state.kvsEditor.editingOf
  })),
  connect(
    () => ({}),
    (dispatch, { kvsObj, kvs, addingAt, editingOf, submitKVs }) => ({
      factoryStartAddAt: pos => () => dispatch(kvStartAddAt(pos)),
      factoryStartEditOf: key => () => dispatch(kvStartEditOf(key)),
      factoryDeleteOf: key => () => submitKVs(u(kvsObj, { $unset: key })),
      cancelAdd: () => dispatch(kvStartAddAt(kvs.length)),
      cancelEdit: () => dispatch(kvStartAddAt(kvs.length)),
      handleCompleteEdit: values =>
        submitKVs({
          ...addingAt ? kvsObj : u(kvsObj, { $unset: editingOf }),
          [values.k]: values.v
        })
    })
  )
)(_KVs);

KVs.propTypes = { submitKVs: PropTypes.func.isRequired };

export default KVs;
