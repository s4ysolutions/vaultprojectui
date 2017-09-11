import React from 'react';

const Vault = query => WrappedComponent => {
  const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class extends React.Component {
    static displayName = `Vault(${getDisplayName(WrappedComponent)})`;

    constructor() {
      super();
      this.query = null;
      console.log('init');
    }
    componentDidMount() {
      console.log('componentDidMount');
    }
    componentWillMount() {
      console.log('componentWillMount');
    }
    componentWillReceiveProps() {
      console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate(nextProps, nextState) {
      console.log('shouldComponentUpdate');
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default Vault;
