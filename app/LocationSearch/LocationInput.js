import React, {Component} from 'react';
import { StyleSheet, View, TextInput, } from 'react-native';
import {LocationDropdown} from '../LocationSearch/LocationDropdown'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class LocationInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focused: true,
            locations: [],
            userInput: '',
            city: null,
            inputPlaceholder: 'Enter a location...',

            // Data
            location: null,
            weather: null,
            temp: null,
            min_temp: null,
            max_temp: null
        }
    }

    fetchAddress = (address) => {
        if (!address) {
            console.log('Empty address')
            this.setState({
                locations: []
            })
            return
        }
        let trimmedAddress = address.trim()
        console.log('Trimmed Address: ', trimmedAddress)
        if (trimmedAddress.length > 0) {
            this.fetchFromAutocompleteApi(trimmedAddress)
        }
    }

    fetchFromAutocompleteApi = (address) => {
        console.log('Address: ', address)
        if(!address){
            return console.log('Error on fetchFromApi') 
        }

        let key = 'AIzaSyAX9pFjludWwlk35gFA2WnvQ1TbNgaTOEk'
        let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${key}`

        axios.get(url).then((response) => {
            if(response.data.status == "OK") {
                console.log('Address Data: ', response.data.predictions)
                console.log('Data general: ', response.data)
                let addresses = response.data.predictions
                this.setState({
                    locations: addresses
                })
                console.log('Current match: ', this.state.locations)
            } 
        }).catch((err) => alert('Error in fetchAutocomplete: ', err))
        
     }

    fetchFromWeatherApi = (city, i) => {
        this.setState({city})

        if(!city) {
            return console.log('Error on fetchFromApi. No City.') 
        }
        
        let x = i ? i : 0
        city = city[x].value
        let key = 'a3fb3abdb4b7a2c492b9ea73b8d8fdb8'
        let units = 'metric' // celcius, farenehit = imperial
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`
        
        axios.get(url).then((response) => {

            let temp = response.data ? response.data.main.temp : 0
            let temp_min = response.data ? response.data.main.temp_min : 0
            let temp_max = response.data ? response.data.main.temp_max : 0
            let weather_description = response.data ? response.data.weather[0].description : ''

            console.log('Response data: ', response.data)
            alert(`Interesting weather data for ${city}:\nWeather description: ${weather_description}\nMain temp: ${temp} C\nMin temp: ${temp_min} C\nMax temp: ${temp_max} C`)
            this.setState({
                inputPlaceholder: city,

                location: city,
                weather: weather_description,
                temp: temp,
                min_temp: temp_min,
                max_temp: temp_max
            })

        // If the request doesnt return any weather results, we move on to the second item in the array and check that one. If that one doesnt return any, we move on.
        // We do this until we either get any results or have reached the end of the array.
        }).catch((err) => {
            if (x == this.state.city.length - 1) {
                alert(`We could't find any data for this one. Sorry about that.`)
            } else {
                console.log(`${city} did not get any results. Moved on the one after.`)
                this.fetchFromWeatherApi(this.state.city, x+=1)
            }
        })
        
    }


    
    render() {
        let searchIcon = <Icon name='search' size={16} color='#333' />
        return (
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInputField}
                        onFocus={() => {
                            this.setState({ 
                                focused: true 
                            })
                            if (this.state.userInput.length < 1) {
                                this.setState({
                                    locations: []
                                })
                            }
                        }}
                        onBlur={() => this.setState({ focused: false })}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                            this.setState({ userInput: text })
                            this.fetchAddress(text)
                        }}
                        value={this.state.userInput}
                        placeholder={this.state.inputPlaceholder}
                    />
                </View>
                <View style={{width: '100%'}}>
                    <LocationDropdown 
                        searchTerm={this.state.userInput}
                        inputFocused={this.state.focused}
                        locations={this.state.locations}
                        pickLocation={(city) => this.fetchFromWeatherApi(city)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  inputWrapper: {
      flexDirection: 'column',
      width: '100%',
    //   height: '100%',
      alignItems: 'center',
  },
  inputContainer: {
      flexDirection: 'row', 
      width: '75%', 
      height: 40, 
      borderWidth: 1, 
      borderColor:'#c3c3c3', 
      borderRadius: 4,
      backgroundColor: '#ccc'
  },
  textInputField: {
      flex: 1,
      backgroundColor: '#FFF',
      borderBottomWidth: 0,
      borderTopWidth: 0,
      borderWidth: 1,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      borderRightWidth: 0,
      borderColor: '#ddd',
      shadowColor: '#000',
      elevation: 1,
      padding: 5
  }
});
