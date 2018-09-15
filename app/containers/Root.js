import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import {connect} from 'react-redux';
export default class Root extends Component {
  render() {
    
    console.log(`POOP! ${this.props.poop}`);
    return (
        <App store={this.props.store}/>
    );
  }
}
