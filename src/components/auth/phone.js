import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import axios from 'axios';

import { getRawPhoneNumber, formatRawPhoneNumber } from './util'
import { ErrorBanner } from '../parts/error'

import { API_URL } from 'react-native-dotenv'

class PhoneAuth extends Component {
	constructor(props) {
		super(props);

		// set initial text states
		this.state = { 
			phone: '',
			showCountryCode: false,
			placeholder: 'Enter Phone Number',
		};
	}

	handlePhoneChange = phone => {

		// remove placeholder
		if (phone.length == 0) {
			this.setState({ 
				showCountryCode: false,
				placeholder: 'Enter Phone Number'
			});
		}
		else if (phone.length == 1) {
			this.setState({ 
				showCountryCode: true,
				placeholder: ''
			});
		}

		// re-format phone number and set state
		let raw = getRawPhoneNumber(phone);
		let formatted = formatRawPhoneNumber(raw);
		this.setState({ phone: formatted });

		// submit phone number
		if (formatted.length == 14) {
			let final = '1' + raw;
			
			// // submit phone number
			// axios.get(API_URL + '/user/phone', {
			// 	params: { num: final }
			// })
			// .then(res => {
			// 	if (!res.data.success) throw new Error();
			// 	this.props.navigation.navigate('ValidateAuth');
			// })
			// .catch(error => {
			// 	console.log(error);
			// 	this.errorBanner.toggle();
			// });
			this.props.navigation.navigate('ValidateAuth');
		}
	}
	
	handlePhoneBlur = () => {
		this.setState({ 
			phone: '',
			showCountryCode: false,
			placeholder: 'Enter Phone Number'
		});
	}

	render() {
		return (
			<View style={styles.page}>
				<ErrorBanner 
					text='Error: Failed to submit phone number.'
					ref={(input) => { this.errorBanner = input; }}
				/>
				<View style={styles.container}>
					{this.state.showCountryCode && <Text style={styles.phoneText}>+1</Text>}
					<TextInput 
						name='phone'
						ref={(input) => { this.phoneInput = input; }}
						style={styles.phoneText}

						// input callbacks
						onChangeText={this.handlePhoneChange}
						onBlur={this.handlePhoneBlur}
						
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
	phoneText: {
		fontSize: 25,
		marginLeft: 5
	}
});

export default PhoneAuth;