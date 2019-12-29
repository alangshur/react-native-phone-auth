import { createStackNavigator } from 'react-navigation-stack';

import HomeApp from '../app/home';

// build app stack navigator
const AppNavigation = createStackNavigator(
    {
        HomeApp: { screen: HomeApp }
    },
    {
        initialRouteName: 'HomeApp',
        headerMode: 'none'
    }
);

export default AppNavigation;