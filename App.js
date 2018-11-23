import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
// 디스크에서 스토어를 가져오기까지 기다려주는 역활
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
import AppContainer from "./components/AppContainer";
const { persistor, store } = configureStore();


class App extends React.Component {
  state = {
    isLoadingComplate: false
  }
  render() {
    const { isLoadingComplate } = this.state;
    if( !isLoadingComplate ) {
      return (<AppLoading
        startAsync={this._loadAssetsAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />)
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
  _loadAssetsAsync = async() => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/logo_black.png"),
        require("./assets/images/logo_white.png"),
        require("./assets/images/noProfile.png"),
        require("./assets/images/noPhoto.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })

    ])
  }
  _handleLoadingError = error => {
    console.error(error);
  }
  _handleFinishLoading = async() => {
    this.setState({
      isLoadingComplate: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;