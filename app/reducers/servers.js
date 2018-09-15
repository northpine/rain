import {ADD_SERVER, DELETE_SERVER, MARK_FOR_DELETE} from '../constants/actions';
import normalize from '../../chrome/extension/background/normalize';
import clean from '../utils/clean';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_SERVER:
            const normData = normalize(action.server);
            const cleanedData = clean(normData);
            if(Object.keys(cleanedData.layers).length > 0) {
                return Object.assign({}, state, {
                    [action.server.url]: cleanedData
                });
            } else {
                return state;
            }
        case DELETE_SERVER:
            return Object.keys(state)
                .filter(key => key !== action.url)
                .reduce((key, obj) => obj[key] = state[key], {});
        case MARK_FOR_DELETE:
            return Object.keys(state).reduce((obj, key) => {
                if(key === action.url) {
                    if(!state[key].markedForDelete) {
                        obj[key] = Object.assign({}, state[key], {
                            markedForDelete: true
                        });
                    }
                    return obj;
                } else {
                    obj[key] = state[key];
                    return obj;
                }
            }, {});
            
            
        default:
            return state;
    }
}