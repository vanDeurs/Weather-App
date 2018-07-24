
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Button,
} from 'react-native'
import PropTypes from 'prop-types'

export default class StatsHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            location: null,
            weather: null,
            temp: null,
            min_temp: null,
            max_temp: null
        }
    }

    componentDidMount() {
        this.getParams()
    }

    getParams = () => {
        const { params } = this.props.navigation.state;

        const location = params ? params.location : null
        const weather = params ? params.weather : null
        const temp = params ? params.temp : null;
        const min_temp = params ? params.min_temp : null
        const max_temp = params ? params.max_temp : null

        this.setParams(location, weather, temp, min_temp, max_temp)
    }

    setParams = (location, weather, temp, min_temp, max_temp) => {
        this.setState({
            location,
            weather,
            temp,
            min_temp,
            max_temp
        })
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View>
                <View style={styles.dropdownWrapper}>
                    <Text>Staaaats</Text>
                    <View>
                        <Text>Location: {this.state.location}</Text>
                        <Text>Weather: {this.state.weather}</Text>
                        <Text>Tempature: {this.state.temp}</Text>
                        <Text>Min Tempature: {this.state.min_temp}</Text>
                        <Text>Max Tempature: {this.state.max_temp}</Text>
                    </View>
                </View>
                <Button 
                    title="Search for a location"
                    onPress={() => navigate('LocationSearch')}
                />
            </View>

        )
    }
  }
  

  StatsHome.propTypes = {

  }
  
  StatsHome.defaultProps = {

  }


const styles = StyleSheet.create({

})