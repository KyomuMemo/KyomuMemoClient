import React, { Component } from 'react';
class ContentsArea extends Component {
  render() {
    const { children } = this.props;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        {children}
      </div>
    );
  }
}
export default ContentsArea;