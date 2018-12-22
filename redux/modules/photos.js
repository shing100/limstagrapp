// Imports
import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";


// Actions
const SET_FEED = "SET_FEED";
const SET_SEARCH = "SET_SEARCH";

// Action Creators

const setFeed = (feed) => {
  return {
    type: SET_FEED,
    feed
  };
}

const setSearch = (search) => {
    return {
        type: SET_SEARCH,
        search
    };
}

// API Actions

const getFeed = () => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
    fetch(`${API_URL}/images/`, {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
    .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
    })
    .then(json => dispatch(setFeed(json)));
  };
}
 
const getSearch = () => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
    fetch(`${API_URL}/images/search/`, {
        headers: {
            Authorization: `JWT ${token}`
        }
    })
    .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
    })
    .then(json => dispatch(setSearch(json)));
    };
}
// Initial State
 
const initialState = {};
 
// Reducer
 
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        case SET_SEARCH:
            return applySetSearch(state, action);
        default:
            return state;
    }
}
 
// Reducer Actions
const applySetFeed = (state, action) => {
    const { feed } = action;
    return {
        ...state,
        feed
    };
}

const applySetSearch = (state, action) => {
    const { search } = action;
    return {
        ...state,
        search
    };
}
 
// Exports
 
const actionCreators = {
    getFeed,
    getSearch
};


export { actionCreators };

// Default Reducer Export

export default reducer;