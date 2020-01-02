import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Keychain from 'react-native-keychain';

class StartLanding extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { landingText: '' };
    }

    async checkAuthentication() {

        // fetch secure access token
        const credentials = await Keychain.getInternetCredentials('access_token');
        if (credentials) {

            // navigate to MainNavigation
            console.log('Navigating to MainNavigation.HomeMain');
            this.props.navigation.navigate('HomeMain');
        }
        else {

            // navigate to AuthNavigation
            console.log('Navigating to AuthNavigation.PhoneAuth');
            this.props.navigation.navigate('PhoneAuth');
        }
    }

    async refreshAuthentication() {

        // reset secure access token
        await Keychain.resetInternetCredentials('access_token');

        // navigate to AuthNavigation
        console.log('Navigating to AuthNavigation.PhoneAuth');
        this.props.navigation.navigate('PhoneAuth');
    }

    async runCriticalException() {

        // reset secure access token
        await Keychain.resetInternetCredentials('access_token');
        
        // raise critical exception
        throw Error('Critical exception');
    }

    componentDidMount = () => {
        try {

            // check for navigation params
            const refresh = this.props.navigation.getParam('refresh');
            const critical = this.props.navigation.getParam('critical');

            // act on navigation params
            if (Boolean(critical)) this.runCriticalException();
            else if (Boolean(refresh)) this.refreshAuthentication();
            else this.checkAuthentication();
        }
        catch (error) {
            console.log(error);

            // set landing page error message
            this.setState({ 
                landingText: 'Error! Please restart or reinstall app.' 
            });
        }
    }

    render = () => {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <Text style={styles.landingText}>{this.state.landingText}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
		flex: 1
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
    },
    landingText: {
        fontSize: 15
    }
});

export default StartLanding;