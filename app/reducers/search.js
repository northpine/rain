import {UPDATE_SEARCH, UPDATE_SEARCH_CONTENTS} from '../constants/actions';
export default (state = {}, action) => {
    switch(action.type) {
        case UPDATE_SEARCH:
            return Object.assign({}, state, {
                searchString: action.search
            });
        case UPDATE_SEARCH_CONTENTS:
            return Object.assign({}, state, {
                shouldSearchContents: action.shouldSearchContents
            })
        default:
            return state;
    }
}