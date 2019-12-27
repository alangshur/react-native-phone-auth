import { createStackNavigator } from 'react-navigation-stack';

import PhoneAuth from '../auth/phone';
import ValidateAuth from '../auth/validate';

// build auth stack navigator
const AuthNavigation = createStackNavigator(
    {
        PhoneAuth: { screen: PhoneAuth },
        ValidateAuth: { screen: ValidateAuth }
    },
    {
        initialRouteName: 'PhoneAuth',
        headerMode: 'none'
    }
);

export default AuthNavigation;