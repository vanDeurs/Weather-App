import {
    StackNavigator,
    createStackNavigator
} from 'react-navigation';

import LocationHome from '../LocationSearch/LocationHome'
import StatsHome from '../StatsDisplay/StatsHome'
  
export const RootStack = createStackNavigator(
    {
        StatsDisplay: {
            screen: StatsHome,
        },
        LocationSearch: {
            screen: LocationHome,
        },
    },
    {
        initialRouteName: 'StatsDisplay',
    }
);