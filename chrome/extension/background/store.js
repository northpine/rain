import reducers from '../../../app/reducers';
import {createStore, applyMiddleware} from 'redux';
import { wrapStore } from 'react-chrome-redux';
import  {createLogger} from 'redux-logger';

const reduxLogger = createLogger();

const store = createStore(reducers,  applyMiddleware(reduxLogger));
wrapStore(store, {portName: 'PINE'});
export default store;