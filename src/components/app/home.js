import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class HomeApp extends Component {
	render = () => {
		return (
			<View style={styles.page}>
				<View style={styles.container}>
					<Text style={styles.instructions}>Home</Text>
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
		backgroundColor: '#F5FCFF'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

export default HomeApp;