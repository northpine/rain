import React, { Component } from 'react';
import App from './App';
import {Provider} from 'react-redux';
class Root extends Component {
  render() {
    console.log("App");
    console.log(this.props.store);
    console.log(this.props);
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}

export default Root
