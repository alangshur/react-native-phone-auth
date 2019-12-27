import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthNavigation from './auth-navigation';
import AppNavigation from './app-navigation';

// build auth-app switch navigator
const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: AppNavigation
    },
    {
        initialRouteName: 'Auth'
    }
);

// containerize switch navigator
const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;