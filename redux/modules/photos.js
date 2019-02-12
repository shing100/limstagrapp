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

<<<<<<< HEAD
const likePhoto = photoId => {
    return (dispatch, getState) => {
        const {
            user: {
                token
            }
        } = getState();
        return fetch(`${API_URL}/images/${photoId}/likes/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        }).then(response => {
            if (response.status === 401) {
                dispatch(userActions.logOut());
            } else if (response.ok) {
                return true;
            } else {
                return false;
            }
        });
    };
}

const unlikePhoto = photoId => {
    return (dispatch, getState) => {
        const {
            user: {
                token
            }
        } = getState();
        return fetch(`${API_URL}/images/${photoId}/unlikes/`, {
            method: "DELETE",
=======
const searchByHashtag = (hashtag) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`${API_URL}/images/search/?hashtags=${hashtag}`, {
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


const likePhoto = (photoId) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        return fetch(`${API_URL}/images/${photoId}/likes/`, {
            method: "POST",
>>>>>>> 510977f9f8e4e35774fae164450843ff07174293
            headers: {
                Authorization: `JWT ${token}`
            }
        }).then(response => {
<<<<<<< HEAD
            if (response.status === 401) {
                dispatch(userActions.logOut());
            } else if (response.ok) {
                return true;
            } else {
                return false;
            }
=======
        if (response.status === 401) {
            dispatch(userActions.logOut());
        } else if (response.ok) {
            return true;
        } else {
            return false;
        }
>>>>>>> 510977f9f8e4e35774fae164450843ff07174293
        });
    };
}

<<<<<<< HEAD
const searchByHashtag = hashtag => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        fetch(`${API_URL}/images/search/?hashtags=${hashtag}`, {
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
=======
const unlikePhoto = (photoId) => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        return fetch(`${API_URL}/images/${photoId}/unlikes/`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`
            }
        }).then(response => {
        if (response.status === 401) {
            dispatch(userActions.logOut());
        } else if (response.ok) {
            return true;
        } else {
            return false;
        }
        });
    };
}

>>>>>>> 510977f9f8e4e35774fae164450843ff07174293
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
    getSearch,
    likePhoto,
    unlikePhoto,
    searchByHashtag
};


export { actionCreators };

// Default Reducer Export

export default reducer;