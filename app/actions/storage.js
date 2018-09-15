//Uses redux-thunk
import {addServer} from '../constants/actions';
export default serverUrl => dispatch => {
    chrome.storage.local.get(serverUrl, (data) => {
        const server = JSON.stringify(data);
        dispatch(addServer(server));
    })
}