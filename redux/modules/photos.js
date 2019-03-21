// Imports
import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";
import uuidv1 from "uuid/v1";

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

function uploadPhoto(file, caption, location, tags) {
    const tagsArray = tags.split(",");
    const data = new FormData();
    data.append("caption", caption);
    data.append("location", location);
    data.append("tags", JSON.stringify(tagsArray));
    data.append("file", {
        uri: file,
        type: "image/jpeg",
        name: `${uuidv1()}.jpg`
    });
    return (dispatch, getState) => {
        const { user: { token } } = getState();
        return fetch(`${API_URL}/images/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "multipart/form-data"
            },
            body: data
        }).then(response => {
            if (response.status === 401) {
                dispatch(userActions.logOut());
            } else if (response.ok) {
                dispatch(getFeed());
                dispatch(userActions.getOwnProfile());
                return true;
            } else {
                return false;
            }
        });
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
    getSearch,
    likePhoto,
    unlikePhoto,
    searchByHashtag,
    uploadPhoto
};


export { actionCreators };

// Default Reducer Export

export default reducer;