import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapboxGL from 'react-native-mapbox-gl'

import { sendAuthenticatedRequest } from './util'

import { MAPBOX_API_KEY } from 'react-native-dotenv'

MapboxGL.setAccessToken(MAPBOX_API_KEY);

class HomeMain extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}	
	
	componentDidMount = () => {

		// warmup home API
		const artificialTarget = Math.floor(Math.random() * 10e6);
		sendAuthenticatedRequest(this.constructor.name, artificialTarget, 
			'/main/home', { artificial_target: artificialTarget })
		.then(res => { console.log(res.data) })
		.catch(error => { console.log(error) });
	}

	render = () => {
		return (
			<View style={{flex: 1}}>
				<MapboxGL.MapView
					ref={(c) => this._map = c}
					style={{flex: 1}}
					zoomLevel={15}
					centerCoordinate={[-73.98197650909422, 40.768793007758816]}>
				</MapboxGL.MapView>
			</View>
		);
	}
}

// const styles = StyleSheet.create({
// 	page: {
// 		flex: 1,
// 	},
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#fff'
// 	}
// });

export default HomeMain;