import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import axios from 'axios';

import { getRawPhoneNumber, formatRawPhoneNumber } from './util'
import { ErrorBanner } from '../parts/error'

import { API_URL } from 'react-native-dotenv'

class PhoneAuth extends Component {
	constructor(props) {
		super(props);

		// set initial phone state
		this.state = { 
			phone: '',
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
			phone: '',
			showCountryCode: false,
			placeholder: 'Enter Phone Number',
			submitted: false
		}, callback);
	}

	handlePhoneChange = phone => {

		// remove placeholder for edge cases
		if (phone.length == 0) {
			this.setState({ 
				phone: phone,
				showCountryCode: false,
				placeholder: 'Enter Phone Number'
			});
			return;
		}
		else if (phone.length == 1) {
			this.setState({ 
				phone: phone,
				showCountryCode: true,
				placeholder: ''
			});
			return;
		}

		// re-format phone number and set new state
		let raw = getRawPhoneNumber(phone);
		let formatted = formatRawPhoneNumber(raw);
		this.setState({ phone: formatted }, () => {

			// submit phone number
			if (formatted.length == 14) {

				// change state to submitted
				this.submitPhoneState(() => {

					// call phone API
					axios.get(API_URL + '/user/phone', {
						params: { num: '1' + raw }
					})
					.then(res => {
						if (!res.data.success) throw new Error();

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
						name='phone'
						style={this.state.submitted ? styles.phoneTextSubmitted : styles.phoneText}
						ref={(input) => { this.phoneInput = input; }}

						// input callbacks
						onChangeText={this.handlePhoneChange}
						
						// input values
						value={this.state.phone}
						placeholder={this.state.placeholder}

						// input config
						textContentType='telephoneNumber' 
						keyboardType='number-pad'
						maxLength={14}

						// input selection config
						caretHidden={true}
						contextMenuHidden={true}
						selection={{
							start: this.state.phone.length, 
							end: this.state.phone.length
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