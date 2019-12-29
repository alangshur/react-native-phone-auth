import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

import { ErrorBanner } from '../parts/error'

import { API_URL } from 'react-native-dotenv'

class ValidateAuth extends Component {
	constructor(props) {
		super(props);

		// set initial validate state
		this.state = { 
			code: '',
            placeholder: 'Enter Six-Digit Code',
            submitted: false,
            errorCount: 0
		};
	}

	submitCodeState = (callback) => {
		this.codeInput.blur();
		this.setState({ submitted: true }, callback);
	}

	unsubmitCodeState = (callback) => {
		this.codeInput.blur();
		this.setState({ 
			code: '',
			placeholder: 'Enter Six-Digit Code',
			submitted: false
		}, callback);
	}

	handleCodeChange = code => {

        // remove placeholder for edge cases
		if (code.length == 0) {
			this.setState({ 
				code: code,
				placeholder: 'Enter Six-Digit Code'
			});
			return;
		}
        else if (code.length == 1) {
			this.setState({ 
				code: code,
				placeholder: 'Enter Six-Digit Code'
			});
			return;
		}

        // set new state 
        this.setState({ code: code }, () => {

			// submit code number
			if (code.length == 6) {

				// change state to submitted
				this.submitCodeState(() => {

					// call validate API
					axios.get(API_URL + '/user/validate', {
						params: { num: code }
					})
					.then(res => {
						if (!res.data.success) throw new Error();
						
						// save access token 
						accessToken = res.data.access_token;
						Keychain.setInternetCredentials('access_token', accessToken, '');

						// change state to unsubmitted
						this.unsubmitCodeState(() => {

							// navigate to AppNavigation
							console.log('Navigating to AppNavigation.HomeApp');
							this.props.navigation.navigate('HomeApp');
						});
					})
					.catch(error => {
						console.log(error);

						// change state to unsubmitted
						this.unsubmitCodeState(() => {

							// count errors
							const errorCount = this.state.errorCount + 1;
							if (errorCount >= 3) {
								this.setState({ errorCount: 0 }, () => {

									// navigate to PhoneAuth
									console.log('Navigating to AuthNavigation.PhoneAuth');
									this.props.navigation.navigate('PhoneAuth');
								});
								return;
							}
							else this.setState({ errorCount: errorCount });
							
							// toggle error banner
							this.errorBanner.toggle();
						});
					});
				});
			}
		});
	}

	render = () => {
		return (
			<View style={styles.page}>
				<ErrorBanner 
					text='Error! Please wait and try again.'
					ref={(input) => { this.errorBanner = input; }}
				/>
				<View style={styles.container}>
					<TextInput 
						name='validate'
                        style={this.state.submitted ?  styles.codeTextSubmitted : styles.codeText}
                        ref={(input) => { this.codeInput = input; }}

						// input callbacks
						onChangeText={this.handleCodeChange}
						
						// input values
						value={this.state.code}
                        placeholder={this.state.placeholder}

						// input config
						keyboardType='number-pad'
						maxLength={6}

						// input selection config
						caretHidden={true}
						contextMenuHidden={true}
						selection={{
							start: this.state.code.length, 
							end: this.state.code.length
						}}
					/>
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
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	codeText: {
		fontSize: 25
    },
	codeTextSubmitted: {
		fontSize: 25,
		color: 'lightgray'
	}
});

export default ValidateAuth;