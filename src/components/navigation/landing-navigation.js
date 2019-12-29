import { createStackNavigator } from 'react-navigation-stack';

import Landing from '../landing';

// build landing stack navigator
const LandingNavigation = createStackNavigator(
    {
        Landing: { screen: Landing }
    },
    {
        initialRouteName: 'Landing',
        headerMode: 'none'
    }
);

export default LandingNavigation;