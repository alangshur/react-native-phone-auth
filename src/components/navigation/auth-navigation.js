import { createStackNavigator } from 'react-navigation-stack';

import Auth from '../auth';

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