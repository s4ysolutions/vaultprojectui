import MobxReactForm from 'mobx-react-form';

export default class MobxMaterialForm extends MobxReactForm {
  bindings () {
    return {
      MaterialTextFieldReimplemented: ({ $try, field, props }) => ({
        type: $try(props.type, field.type),
        id: $try(props.id, field.id),
        name: $try(props.name, field.name),
        value: $try(props.value, field.value),
        label: $try(props.label, field.label),
        placeholder: $try(props.placeholder, field.placeholder),
        errorText: field.validating
          ? props.validatingText
          : $try(props.error, field.error),
        errorStyle: field.validating
          ? {
            background: 'yellow',
            color: 'black'
          }
          : {},
        disabled: $try(props.disabled, field.disabled),
        onChange: $try(props.onChange, field.onChange),
        onBlur: $try(props.onBlur, field.onBlur),
        onFocus: $try(props.onFocus, field.onFocus),
        autoFocus: $try(props.autoFocus, field.autoFocus)
      }),
      MaterialTextField: {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        label: 'floatingLabelText',
        placeholder: 'hintText',
        disabled: 'disabled',
        error: 'errorText',
        onChange: 'onChange',
        onBlur: 'onBlur',
        onFocus: 'onFocus',
        autoFocus: 'autoFocus'
      }
    };
  }

  hooks () {
    return {
      onInit () {
        console.log({ t: this });
        // override default bindings for all text inputs
        // eslint-disable-next-line
        this.each(
          field =>
            field.type === 'text' && field.set('bindings', 'MaterialTextField'));
      }
    };
  }
}
