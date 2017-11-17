import * as React from 'react';
import './Demo.css';

const logo = require('./logo.svg');

class Demo extends React.Component {
  render() {
    return (
      <div className="Demo">
        <div className="Demo-header">
          <img src={logo} className="Demo-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="Demo-intro">
          To get started, edit <code>src/Demo.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Demo;
