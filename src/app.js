import React, { Component } from 'react';

import AppNavigation from './components/navigation/app-navigation';

class App extends Component {
	render = () => {

		// render containerized navigation 
		return (<AppNavigation />);
	}
}

export default App;