import { createStackNavigator } from 'react-navigation-stack';

import Auth from '../auth';

// build auth stack navigator
const AuthNavigation = createStackNavigator(
    {
        Auth: { screen: Auth }
    },
    {
        initialRouteName: 'Auth',
        headerMode: 'none'
    }
);

export default AuthNavigation;