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
//[[[ Row
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
}) => (
  <Grid container>
    <Grid item xs={1} className={classes.icon}>
      {icon}
    </Grid>
    <Grid item xs={7}>
      {children}
    </Grid>
    <Grid item xs={1} className={classes.icon}>
      <Button disabled={!handleStartAddAt} onClick={handleStartAddAt}>
        <AddCircleIcon />
      </Button>
    </Grid>
    <Grid item xs={1} className={classes.icon}>
      <Button disabled={!handleStartEditOf} onClick={handleStartEditOf}>
        <EditIcon />
      </Button>
    </Grid>
    <Grid item xs={1} className={classes.icon}>
      <Button disabled={!handleDeleteOf} onClick={handleDeleteOf}>
        <BackspaceIcon />
      </Button>
    </Grid>
    <Grid item xs={1} />
  </Grid>
);

_Row.propTypes = {
  children: PropTypes.any.isRequired,
  icon: PropTypes.element.isRequired,
  handleStartAddAt: PropTypes.func, //optional if a form already open
  handleStartEditOf: PropTypes.func, //optional if a form already open
  handleDeleteOf: PropTypes.func.isRequired,
  classes: PropTypes.any.isRequired
};

const Row = withStyles(styles)(_Row);
//]]]
//[[[ RowKV
const RowKV = ({
  key,
  value,
  handleStartAddAt,
  handleStartEditOf,
  handleDeleteOf
}) => (
  <Row
    icon={LabelIcon}
    handleStartAddAt={handleStartAddAt}
    handleStartEditOf={handleStartEditOf}
    handleDeleteOf={handleDeleteOf}
  >
    <Typography>
      {key}: {value}
    </Typography>
  </Row>
);

RowKV.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleStartAddAt: PropTypes.func.isRequired,
  handleStartEditOf: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func.isRequired
};
//]]]
// [[[ KVForm
const _KVForm = ({ submitting, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      disabled={submitting}
      name="key"
      label="Key"
      component={renderMuiTextField}
    />
    <Field
      disabled={submitting}
      name="value"
      label="Value"
      component={renderMuiTextField}
    />
  </form>
);

_KVForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const KVForm = reduxForm({
  form: 'kv_form',
  validate: values => {
    const errors = {};
    if (!values.key) errors.key = 'Required';
    if (!values.value) errors.value = 'Required';
    return errors;
  },
  onSubmit: (values, { handleCompleteEdit }) => handleCompleteEdit(values)
})(_KVForm);

_KVForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleCompleteEdit: PropTypes.func.isRequired
};
//]]]]
//[[[ RowForm
const _RowForm = ({
  key,
  value,
  handleCompleteEdit,
  handleDeleteOf,
  handleCancelAdd,
  submitForm
}) => (
  <Row
    icon={LabelIcon}
    handleStartAddAt={!key && submitForm}
    handleStartEditOf={key && submitForm}
    handleDeleteOf={handleDeleteOf}
    handleCancelAdd={handleCancelAdd}
  >
    <KVForm
      initialValues={{ key, value }}
      handleCompleteEdit={handleCompleteEdit}
    />
  </Row>
);
_RowForm.propTypes = {
  key: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  handleCompleteEdit: PropTypes.func.isRequired,
  handleCancelAdd: PropTypes.func.isRequired,
  handleDeleteOf: PropTypes.func //optional for only add form
};

const RowForm = connect(
  () => ({}),
  dispatch => ({
    submitForm: () => dispatch(submit('kv_form'))
  })
)(_RowForm);

//]]]
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
}) => (
  <Grid container>
    {kvs.length === 0 ? (
      addingAt !== false && (
        <RowForm key="" value="" handleCompleteEdit={handleCompleteEdit} />
      )
    ) : (
      Object.entries(kvs).reduce(
        (kv, cc) =>
          addingAt === cc.length //adding KV
            ? cc
                .concat(
                  <RowKV
                    key={kv[0]}
                    value={kv[1]}
                    handleDeleteOf={factoryDeleteOf(kv[0])}
                  />
                ) //can't start edit/add
                .concat(
                  <RowForm
                    key=""
                    value=""
                    handleCompleteEdit={handleCompleteEdit}
                    handleCancelAdd={handleCancelAdd}
                  />
                )
            : editingKey === kv[0]
              ? cc.concat(
                <RowForm //edit KV
                  key={kv[0]}
                  value={kv[1]}
                  handleCompleteEdit={handleCompleteEdit}
                  handleDelete={factoryDeleteOf(kv[0])}
                />
              )
              : cc.concat(
                <RowKV //show KV
                  key={kv[0]}
                  value={kv[1]}
                  handleAdd={factoryStartAddAt(cc.lenght)}
                  handleEdit={factoryStartEditOf(kv[0])}
                  handleDelete={factoryDeleteOf(kv[0])}
                />
              ),
        DEFAULT_CC
      )
    )}
  </Grid>
);

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
  state => ({
    kvs: state.kvs.kvs,
    addingAt: state.kvs.addingAt,
    editingKey: state.kvs.editingKey
  }),
  dispatch => ({
    factoryStartAddAt: pos => () => dispatch(kvStartAddAt(pos)),
    factoryStartEditOf: key => () => dispatch(kvStartEditOf(key)),
    factoryDeleteOf: key => () => dispatch(kvDeleteOf(key)),
    handleCancelAdd: () => dispatch(kvCancelAdd()),
    handleCompleteEdit: () => dispatch(kvCompleteEdit())
  })
)(_KVs);

export default KVs;
