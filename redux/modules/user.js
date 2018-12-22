// imports
import { API_URL, FB_APP_ID} from "../../constants";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// action creators
const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        token
    }
}

const setLogout = () => {
    return {
        type: LOGOUT
    }
}

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const setNotifications = (notifications) => {
    return {
        type: SET_NOTIFICATIONS,
        notifications
    }
}


// API actions
const usernameLogin = (username, password) => {
    return (dispatch) => {
        return fetch(`${API_URL}/rest-auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.token && json.user) {
                dispatch(saveToken(json.token));
                dispatch(setUser(json.user));
                return true;
            } else {
                return false;
            }
        })
    }
}

const facebookLogin = () => {
    return async dispatch => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID,{
            permissions: ["public_profile", "email"]
        })
        if (type === "success"){
            return fetch(`${API_URL}/users/login/facebook/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_token: token
                })
            })
            .then(response => response.json())
            .then(json => {
                if (json.token && json.user) {
                    dispatch(saveToken(json.token));
                    dispatch(setUser(json.user));
                    return true;
                } else {
                    return false;
                }
            })
        }else {
            return false;
        }
    }
}

const getNotifications = () => {
    return (dispatch, getState) => {
        const { user: { token } } = getState();
    fetch(`${API_URL}/notifications/`, {
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
    .then(json => dispatch(setNotifications(json)));
    };
}

// intiial state
const initalState = {
    isLoggedIn: false
}

// reducer

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return applySetToken(state, action);
        case LOG_OUT:
            return applyLogout(state, action);
        case SET_USER:
            return applySetUser(state, action);
        case SET_NOTIFICATIONS:
            return applySetNotifications(state, action);
        default:
            return state;
    }
}
// reducer functions

const applySetToken = (state, action) => {
    const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token
    }
}

const applyLogout = (state, action) => {
    AsyncStorage.clear();
    return {
        isLoggedIn: false
    }
}

const applySetUser = (state, action) => {
    const { user } = action;
    return {
        ...state,
        profile: user
    }
}

const applySetNotifications = (state, action) => {
    const { notifications } = action;
    return {
        ...state,
        notifications
    }
}


// exports

const actionCreators = {
    usernameLogin,
    facebookLogin,
    setLogout,
    getNotifications
}

export { actionCreators };

// reducer export

export default reducer;