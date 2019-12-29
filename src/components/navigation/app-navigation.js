import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LandingNavigation from './landing-navigation'
import AuthNavigation from './auth-navigation';
import MainNavigation from './main-navigation';

// build landing-auth-app switch navigator
const SwitchNavigator = createSwitchNavigator(
    {
        Landing: LandingNavigation,
        Auth: AuthNavigation,
        Main: MainNavigation
    },
    {
        initialRouteName: 'Landing'
    }
);

// containerize switch navigator
const AppNavigation = createAppContainer(SwitchNavigator);

export default AppNavigation;