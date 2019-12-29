import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import md5 from 'md5'

import { API_URL, API_SALT } from 'react-native-dotenv'

class HomeMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homeText: ''
		};
	}	
	
	componentDidMount = () => {

		// build base token
		const artificialTarget = Math.floor(Math.random() * 10e6)
		const internalSalt = this.constructor.name;
		const baseToken = md5(internalSalt + API_SALT + artificialTarget)

		// call home API
		Keychain.getInternetCredentials('access_token')
		.then(credentials => {
			axios.get(API_URL + '/main/home', {
				params: { 
					base_token: baseToken,
					artificial_target: artificialTarget,
					access_token: credentials.username
				}
			})
			.then(res => {
				this.setState({ homeText: res.data.payload });
			})
			.catch(error => {
				console.log(error);
			});
		});
	}

	render = () => {
		return (
			<View style={styles.page}>
				<View style={styles.container}>
					<Text>{this.state.homeText}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});

export default HomeMain;