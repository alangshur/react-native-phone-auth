import { createStackNavigator } from 'react-navigation-stack';

import StartLanding from '../landing/start';

// build landing stack navigator
const LandingNavigation = createStackNavigator(
    {
        StartLanding: { screen: StartLanding }
    },
    {
        initialRouteName: 'StartLanding',
        headerMode: 'none'
    }
);

export default LandingNavigation;