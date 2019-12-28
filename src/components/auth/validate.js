import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import axios from 'axios';

import { ErrorBanner } from '../parts/error'

import { API_URL } from 'react-native-dotenv'

class ValidateAuth extends Component {
	constructor(props) {
		super(props);

		// set initial text states
		this.state = { 
			code: '',
            placeholder: 'Enter Six-Digit Code',
            editable: true
		};
	}

	handleCodeChange = code => {

        // remove placeholder
		if (code.length == 0)
			this.setState({ placeholder: 'Enter Six-Digit Code' });
        else if (code.length == 1) this.setState({ placeholder: '' });

        // set state 
        this.setState({ code: code });

        // submit code number
		if (code.length == 6) {

            // make uneditable
            this.setState({ editable: false });
            this.codeInput.blur();

            // call validate API
			axios.get(API_URL + '/user/validate', {
				params: { num: code }
			})
			.then(res => {
                if (!res.data.success) throw new Error();
                
                // save authentication code and go home
			})
			.catch(error => {
				console.log(error);
				this.errorBanner.toggle();
			});
		}
	}

	handleCodeBlur = () => {
        if (this.state.code.length < 6) 
            this.setState({ 
                code: '',
                placeholder: 'Enter Six-Digit Code'
            });
	}

	render() {
		return (
			<View style={styles.page}>
				<ErrorBanner 
					text='Error: Failed to validate with code.'
					ref={(input) => { this.errorBanner = input; }}
				/>
				<View style={styles.container}>
					<TextInput 
						name='validate'
                        style={this.state.editable ? styles.codeText : styles.codeTextSubmit}
                        ref={(input) => { this.codeInput = input; }}

						// input callbacks
						onChangeText={this.handleCodeChange}
						onBlur={this.handleCodeBlur}
						
						// input values
						value={this.state.code}
                        placeholder={this.state.placeholder}

						// input config
						keyboardType='number-pad'
						maxLength={6}

						// input selection config
						caretHidden={true}
						contextMenuHidden={true}
						selection={{
							start: this.state.code.length, 
							end: this.state.code.length
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
	codeText: {
		fontSize: 25,
		marginLeft: 5
    },
	codeTextSubmit: {
		fontSize: 25,
		marginLeft: 5,
		color: 'lightgray'
	}
});

export default ValidateAuth;