import reducers from '../../../app/reducers';
import {addServer} from '../../../app/constants/actions';
import {createStore, applyMiddleware} from 'redux';
import { wrapStore } from 'react-chrome-redux';
import fake from './fakeData';
import  {createLogger} from 'redux-logger';

const reduxLogger = createLogger();

const store = createStore(reducers,  applyMiddleware(reduxLogger));
store.dispatch(addServer(fake));
wrapStore(store, {portName: 'PINE'});
export default store;