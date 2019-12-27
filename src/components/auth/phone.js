import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { AsYouType } from 'libphonenumber-js';
import axios from 'axios';

import { API_URL } from 'react-native-dotenv'

class PhoneAuth extends Component {
	constructor(props) {
		super(props);

		// set initial text states
		this.state = { 
			phone: '',
			selected: false,
			placeholder: 'Enter Phone Number'
		};
	}

	handlePhoneChange = phone => {
		let formatted = new AsYouType('US').input(phone);

		// correct formatted number
		if (formatted.length == 5) formatted = formatted.substring(1, 4);
		this.setState({ phone: formatted });

		// submit phone number
		if (formatted.length == 14) {
			let phone = '1' + formatted.substring(1, 4) 
				+ formatted.substring(6, 9) 
				+ formatted.substring(10, 14)
			
			// submit phone number
			axios.get(API_URL + '/user/phone', {
				params: { num: phone }
			})
			.then(res => {
				console.log(res.data);
			})
			.catch(error => {
				console.log(error);
			});
		}
	}

	handlePhoneFocus = () => {
		this.setState({ 
			selected: true,
			placeholder: ''
		});
	}
	
	handlePhoneBlur = () => {
		this.setState({ 
			selected: false,
			placeholder: 'Enter Phone Number'
		});
	}

	render() {
		let plusOneText = <Text style={styles.phoneText}>+1</Text>

		return (
			<View style={styles.container}>
				{this.state.selected && plusOneText}
				<TextInput style={styles.phoneText}
					name='phone'

					// input callbacks
					onChangeText={this.handlePhoneChange}
					onFocus={this.handlePhoneFocus}
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
		);
	}
}

const styles = StyleSheet.create({
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