import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native'

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			phone: '',
			selected: false
		};
	}

	handlePhoneChange = phone => {
		this.setState({ phone });
	}

	handlePhoneFocus = () => {
		this.setState({ selected: true });
	}
	
	handlePhoneBlur = () => {
		this.setState({ selected: false });
	}

	render() {
		let plusOneText = <Text style={styles.phoneText}>+1</Text>

		return (
			<View style={styles.container}>
				{this.state.selected && plusOneText}
				<TextInput style={styles.phoneText}
					name='phone'
					onChangeText={this.handlePhoneChange}

					onFocus={this.handlePhoneFocus}
					onBlur={this.handlePhoneBlur}

					value={this.state.phone}
					placeholder='Enter Phone Number'

					keyboardType='number-pad'
					maxLength={10}

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
		fontSize: 23,
		marginLeft: 5
	}
});

export default Auth;