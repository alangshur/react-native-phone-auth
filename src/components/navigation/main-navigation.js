import { createStackNavigator } from 'react-navigation-stack';

import HomeMain from '../main/home';

// build app stack navigator
const MainNavigation = createStackNavigator(
    {
        HomeMain: { screen: HomeMain }
    },
    {
        initialRouteName: 'HomeMain',
        headerMode: 'none'
    }
);

export default MainNavigation;