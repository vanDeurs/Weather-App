import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard
} from 'react-native'

import {characterChecker} from '../utils/CharacterChecker'
import Icon from 'react-native-vector-icons/FontAwesome';

export const LocationDropdownCard = (props) => {

    
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                minHeight: 45,
                paddingVertical: 5,
                justifyContent: 'center',
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#ccc'
            }}
            onPress={() => {
                Keyboard.dismiss()
                props.pickLocation(props.fullAddress)
            }}
            >
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}} >
                <View style={{width: '12.5%', justifyContent: 'center', alignItems: 'center'}} >
                    <Icon name='map-marker' size={16} color='#3654FF' />
                </View>

                <View style={{justifyContent: 'space-around', alignItems: 'flex-start', width: '90%'}}>
                    <View>{characterChecker(props.shortAddress, props.searchTerm)}</View>
                    <Text style={styles.locationTextFull}>{`${props.fullAddress}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    dropdownWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        borderColor: '#b9b9b9',
        backgroundColor: 'rgba(255,255,255,.8)'

    },
    list: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#b9b9b9',
    },
    locationText: {
        color: '#c3c3c3'
    },
    locationTextFull: {
        fontSize: 13,
        color: '#ccc',
        display: 'flex',
        flexWrap: 'wrap',
    }
})