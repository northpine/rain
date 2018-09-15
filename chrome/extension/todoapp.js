import React from 'react';
import {render} from 'react-dom';
import Root from '../../app/containers/Root';
import {Store} from 'react-chrome-redux';
import {BeatLoader} from 'react-spinners';
import {Provider} from 'react-redux';
let initialized = false;
let store;
const startApp = () => {
  render(
    <Provider store={store}>
      <Root poop={"POOOPPPPP"}/>
    </Provider>, 
    document.querySelector('#root')
  );

}
let initStore = async () => {
    store = new Store({
      portName: 'PINE'
    });
    console.log("init store");
    store.ready().then(() => {
      initialized = true;
      console.log("Connected to background store");
      startApp();
    });
}
initStore();








