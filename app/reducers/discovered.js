import {ADD_DISCOVERED} from '../../app/constants/actions';

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_DISCOVERED:
            return Object.assign({}, state, {
                [action.server]: true
            });
        default:
            return state;
    }
}