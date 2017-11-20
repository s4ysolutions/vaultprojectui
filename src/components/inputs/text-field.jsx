import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
//
// eslint-disable-next-line no-console, no-unused-vars
const _ = o => (console.log(o), o);

export default observer(({
  field,
  type = 'text',
    label = null,
  placeholder = null,
  helperText = null,
  ...props
}) =>
  <TextField
    {..._(field.bind({
      type,
      label,
      placeholder,
      helperText
    }))}
    {...props} />);
