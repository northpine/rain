export const ADD_SERVER = 'ADD_SERVER';
export const DELETE_SERVER = 'DELETE_SERVER';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const ADD_DISCOVERED = 'ADD_DISCOVERED';
export const ADD_TRAVERSAL = 'ADD_TRAVERSAL';
export const REMOVE_TRAVERSAL = 'REMOVE_TRAVERSAL';
export const DELETE_TRAVERSAL = 'DELETE_TRAVERSAL';
export const MARK_FOR_DELETE = 'MARK_FOR_DELETE';
export const UPDATE_SEARCH_CONTENTS = "UPDATE_SEARCH_CONTENTS";

export const updateSearch = (searchString) => {
    return {
        type: UPDATE_SEARCH,
        search: searchString
    }
}

export const updateSearchContents = (shouldSearchContents) => {
    return {
        type: UPDATE_SEARCH_CONTENTS,
        shouldSearchContents: shouldSearchContents
    }
}

export const removeTraversal = (server) => {
    return {
        type: REMOVE_TRAVERSAL,
        server: server
    }
}

export const addTraversal = (url) => {
    return {
        type: ADD_TRAVERSAL,
        server: url
    }
}

export const addCount = (url) => {
    return {
        type: MARK_FOR_DELETE,
        url: url
    }
}

export const deleteServer = (url) => {
    return {
        type: DELETE_SERVER,
        url: url
    }
}

export const addServer = (server) => {
    return {
        type: ADD_SERVER,
        server: server
    }
}

