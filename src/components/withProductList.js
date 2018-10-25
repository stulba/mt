import React, { Component } from 'react';

export const withProductList = (WrappedComponent, props) => {
  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
