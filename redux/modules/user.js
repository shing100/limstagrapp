// imports
import { API_URL, FB_APP_ID} from "../../constants";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

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


// exports

const actionCreators = {
    usernameLogin,
    facebookLogin,
    setLogout
}

export { actionCreators };

// reducer export

export default reducer;