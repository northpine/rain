import React from 'react';
import {render} from 'react-dom';
import Root from './containers/Root';
import {Store} from 'react-chrome-redux';

let initStore = async () => {
    let store = new Store({
      portName: 'PINE'
    });
    console.log("init store");
    await store.ready()
    console.log("Connected to background store");
    render(<Root store={store} poop={"Poop"}/>, document.querySelector('#root'));
}
initStore();








