import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LandingNavigation from './landing-navigation'
import AuthNavigation from './auth-navigation';
import AppNavigation from './app-navigation';

// build landing-auth-app switch navigator
const SwitchNavigator = createSwitchNavigator(
    {
        Landing: LandingNavigation,
        Auth: AuthNavigation,
        App: AppNavigation
    },
    {
        initialRouteName: 'Landing'
    }
);

// containerize switch navigator
const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;