import React from 'react';
const onMount = action => WrappedComponent => {
  const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class extends React.Component {
    static displayName = `OnMount(${getDisplayName(WrappedComponent)})`;

    constructor() {
      super();
    }
    componentDidMount() {
      action(this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default OnMount;
