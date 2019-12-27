import { createStackNavigator } from 'react-navigation-stack';

import Home from '../home';

// build app stack navigator
const AppNavigation = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

export default AppNavigation;