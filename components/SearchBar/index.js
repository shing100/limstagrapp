import React, { Component } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native"
import PropTypes from "prop-types";


class SearchBar extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired
    };
    state = {
        value: ""
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
            value
        } = this.state;
        submit(value);
    }
}



const styles = StyleSheet.create({
    container: {},
    searchBar: {}
});

export default SearchBar;