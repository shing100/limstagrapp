import React from "react"
import { Text, View } from "react-native"

const FeedScreen = props => (
    <Text onPress={() => props.navigation.navigate("TakePhoto")}>Feed</Text>
)

export default FeedScreen;