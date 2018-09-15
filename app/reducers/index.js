import {combineReducers } from 'redux';
import servers from './servers'
import discovered from './discovered';
import traversal from './traversal';
import search from './search';
export default combineReducers({
    discovered: discovered,
    servers: servers,
    traversals: traversal,
    search: search
});