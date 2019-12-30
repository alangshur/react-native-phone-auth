import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import axios from 'axios';
import md5 from 'md5'

import { getRawPhoneNumber, formatRawPhoneNumber } from './util'
import { ErrorBanner } from '../parts/error'

import { API_URL, API_SALT } from 'react-native-dotenv'

class PhoneAuth extends Component {
	constructor(props) {
		super(props);

		// set initial phone state
		this.state = { 
			phoneNumber: '',
			showCountryCode: false,
			placeholder: 'Enter Phone Number',
			submitted: false
		};
	}

	submitPhoneState = (callback) => {
		this.phoneInput.blur();
		this.setState({ submitted: true }, callback);
	}

	unsubmitPhoneState = (callback) => {
		this.phoneInput.blur();
		this.setState({ 
			phoneNumber: '',
			showCountryCode: false,
			placeholder: 'Enter Phone Number',
			submitted: false
		}, callback);
	}

	handlePhoneChange = phoneNumber => {

		// remove placeholder for edge cases
		if (phoneNumber.length == 0) {
			this.setState({ 
				phoneNumber: phoneNumber,
				showCountryCode: false,
				placeholder: 'Enter Phone Number'
			});
			return;
		}
		else if (phoneNumber.length == 1) {
			this.setState({ 
				phoneNumber: phoneNumber,
				showCountryCode: true,
				placeholder: ''
			});
			return;
		}

		// re-format phone number and set new state
		let raw = getRawPhoneNumber(phoneNumber);
		let formatted = formatRawPhoneNumber(raw);
		this.setState({ phoneNumber: formatted }, () => {

			// submit phone number
			if (formatted.length == 14) {

				// change state to submitted
				this.submitPhoneState(() => {
					const finalPhone = '1' + raw;

					// build base token
					const internalSalt = this.constructor.name
					const baseToken = md5(internalSalt + API_SALT + finalPhone)

					// call phone API
					axios.get(API_URL + '/auth/phone', {
						params: { 
							phone_number: finalPhone
						},
						headers: {
							base_token: baseToken
						}
					})
					.then(res => {
						if (!res.data.success) {
							if (res.data.critical) {
							
								// change state to unsubmitted
								this.unsubmitPhoneState(() => {
	
									// navigate to Landing
									console.log('Navigating to LandingNavigation.Landing')
									this.props.navigation.navigate('StartLanding', { critical: true });
								});
								return;
							}
							else throw new Error('Exception in server request');
						}

						// change state to unsubmitted
						this.unsubmitPhoneState(() => {

							// navigate to ValidateAuth
							console.log('Navigating to AuthNavigation.ValidateAuth')
							this.props.navigation.navigate('ValidateAuth');
						});
					})
					.catch(error => {
						console.log(error);

						// change state to unsubmitted
						this.unsubmitPhoneState(() => {

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

					{this.state.showCountryCode && <Text style={this.state.submitted ? 
						styles.plusOneTextSubmitted : styles.plusOneText}>+1</Text>}

					<TextInput 
						name='phone-number'
						style={this.state.submitted ? styles.phoneTextSubmitted : styles.phoneText}
						ref={(input) => { this.phoneInput = input; }}

						// input callbacks
						onChangeText={this.handlePhoneChange}
						
						// input values
						value={this.state.phoneNumber}
						placeholder={this.state.placeholder}

						// input config
						textContentType='telephoneNumber' 
						keyboardType='number-pad'
						maxLength={14}

						// input selection config
						caretHidden={true}
						contextMenuHidden={true}
						selection={{
							start: this.state.phoneNumber.length, 
							end: this.state.phoneNumber.length
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
	plusOneText: {
		fontSize: 25,
		marginRight: 5
	},
	plusOneTextSubmitted: {
		fontSize: 25,
		marginRight: 5,
		color: 'lightgray'
	},
	phoneText: {
		fontSize: 25,
	},
	phoneTextSubmitted: {
		fontSize: 25,
		color: 'lightgray'
	}
});

export default PhoneAuth;