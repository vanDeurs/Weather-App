
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import {LocationDropdownCard} from '../LocationSearch/LocationDropdownCard'

export class LocationDropdown extends Component {

    renderItem(data) {
        let addressArray = data.terms
        return (
            <LocationDropdownCard 
                searchTerm={this.props.searchTerm}
                shortAddress={data.structured_formatting.main_text}
                fullAddress={data.description}
                pickLocation={() => this.props.pickLocation(addressArray)}
            />
        )
    } 
    
    renderResultList(items) {
		if (!this.props.inputFocused || items.length === 0) {
            return null	
        } 
		const keyGenerator = () => Math.random().toString(36).substr(2, 10)
		return (
            <FlatList
                keyboardShouldPersistTaps='always'
                style={styles.list}
                data={items}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={keyGenerator}
			/>
		)
    }
    
    
    render() {
      return (
        <View style={styles.dropdownWrapper}>
            {this.renderResultList(this.props.locations)}
        </View>
      )
    }
  }


LocationDropdown.propTypes = {
    inputFocused: PropTypes.bool,
    locations: PropTypes.array,
    pickLocation: PropTypes.func
    
}

LocationDropdown.defaultProps = {
    inputFocused: false,
    locations: [],
    pickLocation: () => null
}


const styles = StyleSheet.create({
    dropdownWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        borderColor: '#b9b9b9',
        backgroundColor: 'rgba(255,255,255, 1)'

    }
})