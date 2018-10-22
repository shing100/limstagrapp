import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native';

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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
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