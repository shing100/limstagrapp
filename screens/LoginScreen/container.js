import React, { Component } from "react";
import { Alert } from "react-native";
import PorpTypes from "prop-types";
import LogInScreen from "./presenter";

class Container extends Component {
    state = {
        username: "",
        password: "",
        isSubmitting: false
    };
    static porpTypes = {
        usernameLogin: PorpTypes.func.isRequired,
        facebookLogin: PorpTypes.func.isRequired
    }
    render() {
        return (
            <LogInScreen
                {...this.state}
                changeUsername={this._changeUsername}
                changePassword={this._changePassword}
                submit={this._submit}
                facebookLogin={this._hanldeFBLogin}
            />
            );
        }
        _changeUsername = text => {
            this.setState({ username: text });
        };
        _changePassword = text => {
            this.setState({ password: text });
        };
        _submit = async () => {
            const { username, password, isSubmitting } = this.state;
            const { usernameLogin } = this.props;
            if (!isSubmitting) {
            if (username && password) {
                this.setState({
                isSubmitting: true
                });
                const loginResult = await usernameLogin(username, password);
                if(!loginResult){
                    Alert.alert("로그인 실패");
                    this.setState({
                        isSubmitting: false
                    })
                }
                // redux action
            } else {
                Alert.alert("All fields are required");
            }
        }
    };
    _hanldeFBLogin = async () => {
        const { facebookLogin } = this.props;
        this.setState({
            isSubmitting: true
        })
        const facebookLoginResult = await facebookLogin();
        if(!facebookLoginResult){
            this.setState({ isSubmitting: false})
        }
    }
}

export default Container;