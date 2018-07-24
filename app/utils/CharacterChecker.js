import React from 'react'
import {
    Text
} from 'react-native'


/**
 * Find and highlight relevant keywords within a block of text
 * @param  {string} label - The text to parse
 * @param  {string} value - The search keyword to highlight
 * @return {object} A JSX object containing an array of alternating strings and JSX
 */

const toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

const characterChecker = (label, value) => {
    console.log('Label: ', label)
    console.log('Value: ', value)
    if (!value) {
        return toTitleCase(label)
    }
    return (<Text>
    { label.toLowerCase().split(value.toLowerCase())
        .reduce((prev, current, i) => {
            if (!i) {
                return [current]
            }
            return prev.concat(<Text style={{color: 'green'}} key={value + current}>{ toTitleCase(value) }</Text>, current)
        }, [])
    }
    </Text>)
}

module.exports = {
    characterChecker
}