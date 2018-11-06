// imports
import { API_URL } from "../../constants";

// actions

// action creators

// API actions
const usernameLogin = (username, password) => {
    return (dispatch) => {
        fetch(`${API_URL}/rest-auth/login/`, {
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
        .then(json => console.log(json))
    }
}

// intiial state
const initalState = {
    isLoggedIn: false
}

// reducer

const reducer = (state = initalState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
// reducer functions

// exports

const actionCreators = {
    usernameLogin
}

export { actionCreators };

// reducer export

export default reducer;