import {ADD_TRAVERSAL, REMOVE_TRAVERSAL} from '../constants/actions';
export default (state = [], action) => {
    switch(action.type) {
        case ADD_TRAVERSAL:
            return [
                ...state,
                action.server
            ]
        case REMOVE_TRAVERSAL:
            const index = state.indexOf(action.server);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        default:
            return state;
    }
}