import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native'

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			email: '',
			password: ''
		};
	}

	handleEmailChange = email => {
		this.setState({ email });
	}
	
	handlePasswordChange = password => {
		this.setState({ password });
	}

	onLogin = async () => {
		const { email, password } = this.state;

		try {
			if (email.length > 0 && password.length > 0) {
				this.props.navigation.navigate('App');
			}
		} 
		catch (error) {
			alert(error);
		}
	}

	render() {	
		return (
			<View style={styles.container}>
				<View style={{ margin: 10 }}>
					<TextInput
						name='email'
						value={this.state.email}
						placeholder='Enter email'
						autoCapitalize='none'
						onChangeText={this.handleEmailChange}
					/>
				</View>
				<View style={{ margin: 10 }}>
					<TextInput
						name='password'
						value={this.state.password}
						placeholder='Enter password'
						secureTextEntry
						onChangeText={this.handlePasswordChange}
					/>
				</View>
				<Button title='Login' onPress={this.onLogin} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Auth;