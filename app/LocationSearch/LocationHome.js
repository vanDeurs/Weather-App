import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import LocationInput from './../LocationSearch/LocationInput'

export default class LocationHome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LocationInput />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50
    },
});
