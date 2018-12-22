import React from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";

const FeedScreen = props => (
    <ScrollView refreshControl={
        <RefreshControl 
            refreshing={props.isFetching}
            onRefresh={props.refresh}
            tintColor={"black"}
        />
    }
    contentContainerStyle={styles.containor}
    />
);

const styles = StyleSheet.create({
    containor:{
        flex: 1,
        backgroundColor: "white"
    }
})

FeedScreen.propTypes = {
    isFetching: PropTypes.bool.isRequired
}

export default FeedScreen;