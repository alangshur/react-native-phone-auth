import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import * as Keychain from 'react-native-keychain';

import { sendUnauthenticatedRequest } from './util'
import { ErrorBanner } from '../parts/error'

class ValidateAuth extends Component {
	constructor(props) {
		super(props);

		// set initial validate state
		this.state = { 
			validationCode: '',
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
			validationCode: '',
			placeholder: 'Enter Six-Digit Code',
			submitted: false
		}, callback);
	}

	handleCodeChange = validationCode => {

        // remove placeholder for edge cases
		if (validationCode.length == 0) {
			this.setState({ 
				validationCode: validationCode,
				placeholder: 'Enter Six-Digit Code'
			});
			return;
		}
        else if (validationCode.length == 1) {
			this.setState({ 
				validationCode: validationCode,
				placeholder: 'Enter Six-Digit Code'
			});
			return;
		}

        // set new state 
        this.setState({ validationCode: validationCode }, () => {

			// submit validation code
			if (validationCode.length == 6) {

				// change state to submitted
				this.submitCodeState(() => {

					// call validate API
					sendUnauthenticatedRequest(this.constructor.name, 
						validationCode, '/auth/validate', {
						validation_code: validationCode 
					})
					.then(res => {
						if (!res.data.success) {
							if (res.data.critical) {
							
								// change state to unsubmitted
								this.unsubmitCodeState(() => {
	
									// navigate to Landing
									console.log('Navigating to LandingNavigation.Landing')
									this.props.navigation.navigate('StartLanding', { 
										critical: true 
									});
								});
								return;
							}
							else throw new Error('Exception in server request');
						}
						
						// save access token 
						accessToken = res.data.access_token;
						Keychain.setInternetCredentials('access_token', accessToken, '');

						// change state to unsubmitted
						this.unsubmitCodeState(() => {

							// navigate to MainNavigation
							console.log('Navigating to MainNavigation.HomeMain');
							this.props.navigation.navigate('HomeMain');
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
							else this.setState({ errorCount: errorCount }, () => {

								// toggle error banner
								this.errorBanner.toggle();
							});
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
						name='validation-code'
                        style={this.state.submitted ?  styles.codeTextSubmitted : styles.codeText}
                        ref={(input) => { this.codeInput = input; }}

						// input callbacks
						onChangeText={this.handleCodeChange}
						
						// input values
						value={this.state.validationCode}
                        placeholder={this.state.placeholder}

						// input config
						keyboardType='number-pad'
						maxLength={6}

						// input selection config
						caretHidden={true}
						contextMenuHidden={true}
						selection={{
							start: this.state.validationCode.length, 
							end: this.state.validationCode.length
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