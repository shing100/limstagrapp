import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet } from "react-native";

class AppContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    }
    render() {
        const { isLoggedIn } = this.props;
        return (
            <View style={style.container}>
                <StatusBar hidden={false}/>
                {isLoggedIn ? (<Text>로그인 됨</Text>) : (<Text>로그인 안됨</Text>)}
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AppContainer;
