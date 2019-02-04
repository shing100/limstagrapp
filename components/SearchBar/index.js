import React, { Component } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native"
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

class SearchBar extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired
    };
    state = {
        term: ""
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={"Search"}
                    style={styles.searchBar}
                    returnKeyType={"search"}
                    onChangeText={this._changeText}
                    value={term}
                    onEndEditing={this._handeSubmit} />
            </View>
        )
    }

    _changeText = text => {
        this.setState({
            term: text
        })
    }

    _handeSubmit = () => {
        const {
            submit
        } = this.props;
        const {
            term
        } = this.state;
        submit(term);
    }
}



const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 15,
        height: 45,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#bbb",
        justifyContent: "flex-end"
    },
    searchBar: {
        height: 30,
        marginBottom: 10,
        borderRadius: 4,
        padding: 5,
        backgroundColor: "#EDEDED"
    }
});

export default SearchBar;