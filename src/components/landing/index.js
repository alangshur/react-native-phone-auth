import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Keychain from 'react-native-keychain';

class Landing extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            landingText1: '',
            landingText2: ''
        };
    }

    async checkAuthentication() {
        try {
            const credentials = await Keychain.getInternetCredentials('access_token');
            if (credentials) {

                // navigate to AppNavigation
                console.log('Navigating to AppNavigation.HomeApp');
                this.props.navigation.navigate('HomeApp');
            }
            else {

                // navigate to AuthNavigation
                console.log('Navigating to AuthNavigation.PhoneAuth');
                this.props.navigation.navigate('PhoneAuth');
            }
        }
        catch (error) {
            console.log(error);

            // set landing page error message
            this.setState({ 
                landingText1: 'Error launching app.',
                landingText2: 'Please wait and try again.' 
            });
        }
    }

    componentDidMount = () => {
        this.checkAuthentication();
    }

    render = () => {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <Text style={styles.landingText}>{this.state.landingText1}</Text>
                    <Text style={styles.landingText}>{this.state.landingText2}</Text>
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

export default Landing;