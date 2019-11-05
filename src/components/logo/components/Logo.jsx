import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

const logo = require('./images/logo.png');

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo-text">
          <img src={logo}/>{'    '}
        </Link>
      </div>
    );
  }
}
